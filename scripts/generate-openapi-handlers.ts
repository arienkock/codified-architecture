import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head' | 'trace';

interface ReferenceObject {
  $ref: string;
}

interface SchemaObject {
  schemaName?: string;
  type?: string | string[];
  format?: string;
  nullable?: boolean;
  enum?: Array<string | number | boolean | null>;
  const?: string | number | boolean | null;
  properties?: Record<string, SchemaObject | ReferenceObject>;
  required?: string[];
  items?: SchemaObject | ReferenceObject;
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  description?: string;
  anyOf?: Array<SchemaObject | ReferenceObject>;
  oneOf?: Array<SchemaObject | ReferenceObject>;
  allOf?: Array<SchemaObject | ReferenceObject>;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  example?: unknown;
  examples?: unknown[];
  default?: unknown;
}

type SchemaOrRef = SchemaObject | ReferenceObject;

interface ParameterObject {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  required?: boolean;
  description?: string;
  schema?: SchemaOrRef;
}

interface MediaTypeObject {
  schema?: SchemaOrRef;
}

interface RequestBodyObject {
  required?: boolean;
  description?: string;
  content?: Record<string, MediaTypeObject>;
}

interface ResponseObject {
  description?: string;
  content?: Record<string, MediaTypeObject>;
}

interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Array<ParameterObject | ReferenceObject>;
  requestBody?: RequestBodyObject | ReferenceObject;
  responses: Record<string, ResponseObject | ReferenceObject>;
}

interface PathItemObject {
  parameters?: Array<ParameterObject | ReferenceObject>;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  patch?: OperationObject;
  head?: OperationObject;
  options?: OperationObject;
  trace?: OperationObject;
}

interface ComponentsObject {
  schemas?: Record<string, SchemaOrRef>;
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  responses?: Record<string, ResponseObject | ReferenceObject>;
}

interface OpenAPIObject {
  paths: Record<string, PathItemObject>;
  components?: ComponentsObject;
}

interface SchemaContext {
  document: OpenAPIObject;
  seenRefs: Set<string>;
}

const HTTP_METHODS: HttpMethod[] = ['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.resolve(__dirname, './templates/domain-handler.ts.tpl');
const outputDir = path.resolve(__dirname, '../src/webServer/generated/handlers');
const openApiModulePath = path.resolve(__dirname, '../src/webServer/openapi.ts');

const domainSeamTypesModulePath = path.resolve(__dirname, '../src/domain-seam/types.ts');
const DOMAIN_SEAM_NAMESPACE = 'DomainSeamTypes';

(async () => {
  const template = await readFile(templatePath, 'utf8');
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const document = await loadOpenApiDocument(openApiModulePath);
  const generatedFiles: Array<{ handlerName: string; fileStem: string }> = [];

  for (const [routePath, pathItem] of Object.entries(document.paths ?? {})) {
    if (!pathItem) continue;
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation) continue;

      const handlerBaseName = toPascalCase(
        operation.operationId ?? `${method} ${routePath}`
      );
      const handlerName = `${handlerBaseName}Handler`;
      const handlerVarName = toCamelCase(handlerName);
      const fileStem = `${toKebabCase(handlerBaseName)}.handler`;
      const handlerFilePath = path.join(outputDir, `${fileStem}.ts`);

      const context: SchemaContext = {
        document,
        seenRefs: new Set<string>(),
      };

      const domainSeamImportPath = toImportPath(path.dirname(handlerFilePath), domainSeamTypesModulePath);
      const additionalImports = `import * as ${DOMAIN_SEAM_NAMESPACE} from '${domainSeamImportPath}';`;

      const allParameters = [
        ...(pathItem.parameters ?? []),
        ...(operation.parameters ?? []),
      ].map((param) => dereference<ParameterObject>(param, document));

      const pathParamsSchema = buildParameterSchema(allParameters, 'path', context);
      const queryParamsSchema = buildParameterSchema(allParameters, 'query', context);
      const headerParamsSchema = buildParameterSchema(allParameters, 'header', context);
      const requestBodySchema = buildRequestBodySchema(operation, context);
      const responseSchemas = buildResponseSchemas(operation, context);

      const filledTemplate = fillTemplate(template, {
        ADDITIONAL_IMPORTS: additionalImports,
        PATH_PARAMS_SCHEMA: pathParamsSchema,
        QUERY_PARAMS_SCHEMA: queryParamsSchema,
        HEADER_PARAMS_SCHEMA: headerParamsSchema,
        REQUEST_BODY_SCHEMA: requestBodySchema,
        RESPONSE_SCHEMAS: renderResponseSchemas(responseSchemas),
        HANDLER_RESPONSE_TYPE_MAP: renderResponseTypeMap(responseSchemas),
        HANDLER_RESPONSE_UNION: renderResponseUnion(responseSchemas, handlerName),
        HANDLER_NAME: handlerName,
        HANDLER_VAR_NAME: handlerVarName,
        HTTP_METHOD: method.toUpperCase(),
        PATH: routePath,
      });

      await writeFile(handlerFilePath, filledTemplate, 'utf8');

      generatedFiles.push({
        handlerName,
        fileStem,
      });
    }
  }

  generatedFiles.sort((a, b) => a.handlerName.localeCompare(b.handlerName));

  const indexContent =
    generatedFiles.map((entry) => `export * from './${entry.fileStem}.js';`).join('\n') +
    (generatedFiles.length ? '\n' : '');

  await writeFile(path.join(outputDir, 'index.ts'), indexContent, 'utf8');

  console.log(`Generated ${generatedFiles.length} handler(s) in ${path.relative(process.cwd(), outputDir)}`);
})().catch((error) => {
  console.error('Failed to generate handlers from OpenAPI document.');
  console.error(error);
  process.exitCode = 1;
});

async function loadOpenApiDocument(modulePath: string): Promise<OpenAPIObject> {
  const moduleUrl = pathToFileURL(modulePath).href;
  const moduleExports = await import(moduleUrl);
  if (!moduleExports.document) {
    throw new Error(`Expected the OpenAPI module at ${modulePath} to export a "document" value.`);
  }
  return moduleExports.document as OpenAPIObject;
}

function fillTemplate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }, template);
}

function buildParameterSchema(
  parameters: ParameterObject[],
  location: ParameterObject['in'],
  context: SchemaContext
): string {
  const relevant = parameters.filter((param) => param.in === location);
  if (!relevant.length) {
    return 'z.object({})';
  }

  const propertyLines = relevant.map((param) => {
    const required = location === 'path' ? true : Boolean(param.required);
    let schemaCode = schemaToZod(param.schema, context);
    if (!required) {
      schemaCode += '.optional()';
    }
    if (param.description) {
      schemaCode += `.describe(${JSON.stringify(param.description)})`;
    }
    return `  ${JSON.stringify(param.name)}: ${schemaCode}`;
  });

  return `z.object({\n${propertyLines.join(',\n')}\n}).strict()`;
}

function buildRequestBodySchema(operation: OperationObject, context: SchemaContext): string {
  if (!operation.requestBody) {
    return 'z.undefined()';
  }

  const requestBody = dereference<RequestBodyObject>(operation.requestBody, context.document);
  const jsonContent = requestBody.content?.['application/json'];

  if (!jsonContent?.schema) {
    return 'z.undefined()';
  }

  let schemaCode = schemaToZod(jsonContent.schema, context);
  if (!requestBody.required) {
    schemaCode += '.optional()';
  }
  if (requestBody.description) {
    schemaCode += `.describe(${JSON.stringify(requestBody.description)})`;
  }
  return schemaCode;
}

function buildResponseSchemas(operation: OperationObject, context: SchemaContext) {
  const entries: Array<{ status: string; schemaCode: string }> = [];

  for (const [statusCode, responseOrRef] of Object.entries(operation.responses ?? {})) {
    const response = dereference<ResponseObject>(responseOrRef, context.document);
    const jsonContent = response.content?.['application/json'];

    let schemaCode: string;
    if (jsonContent?.schema) {
      schemaCode = schemaToZod(jsonContent.schema, context);
    } else {
      schemaCode = 'z.undefined()';
    }

    if (!jsonContent?.schema && response.description) {
      schemaCode += `.describe(${JSON.stringify(response.description)})`;
    }

    entries.push({
      status: statusCode,
      schemaCode,
    });
  }

  if (!entries.length) {
    entries.push({
      status: 'default',
      schemaCode: 'z.undefined()',
    });
  }

  return entries.sort((a, b) => a.status.localeCompare(b.status));
}

function renderResponseSchemas(entries: Array<{ status: string; schemaCode: string }>): string {
  return entries
    .map((entry) => renderObjectEntry(JSON.stringify(entry.status), entry.schemaCode))
    .join('\n');
}

function renderResponseTypeMap(entries: Array<{ status: string; schemaCode: string }>): string {
  return entries
    .map((entry) => {
      const literal = JSON.stringify(entry.status);
      return `  ${literal}: z.infer<(typeof responseSchemas)[${literal}]>;`;
    })
    .join('\n');
}

function renderResponseUnion(entries: Array<{ status: string; schemaCode: string }>, handlerName: string): string {
  if (entries.length === 0) {
    return '{ status: number; body: unknown }';
  }

  if (entries.length === 1) {
    const statusLiteral = JSON.stringify(entries[0].status);
    return `{ status: ${statusLiteral}; body: ${handlerName}ResponseBodies[${statusLiteral}] }`;
  }

  const unionMembers = entries.map((entry) => {
    const statusLiteral = JSON.stringify(entry.status);
    return `{ status: ${statusLiteral}; body: ${handlerName}ResponseBodies[${statusLiteral}] }`;
  });

  return unionMembers.join(' | ');
}

function renderObjectEntry(keyLiteral: string, valueCode: string, indentSpaces = 2): string {
  const indent = ' '.repeat(indentSpaces);
  const nestedIndent = ' '.repeat(indentSpaces + 2);
  const lines = valueCode.split('\n');

  if (lines.length === 1) {
    return `${indent}${keyLiteral}: ${lines[0]},`;
  }

  const [firstLine, ...rest] = lines;
  let result = `${indent}${keyLiteral}: ${firstLine}`;
  if (rest.length) {
    result += '\n' + rest.map((line) => `${nestedIndent}${line}`).join('\n');
  }
  result += ',';
  return result;
}

function schemaToZod(schema: SchemaOrRef | undefined, context: SchemaContext): string {
  if (!schema) {
    return 'z.undefined()';
  }

  if (!isReferenceObject(schema)) {
    const schemaReference = resolveSchemaReference(schema);
    if (schemaReference) {
      return schemaReference;
    }
  }

  if (isReferenceObject(schema)) {
    const ref = schema.$ref;
    if (context.seenRefs.has(ref)) {
      return 'z.lazy(() => z.any())';
    }
    context.seenRefs.add(ref);
    const resolved = dereference<SchemaObject>(schema, context.document);
    const result = schemaToZod(resolved, context);
    context.seenRefs.delete(ref);
    return result;
  }

  if (schema.anyOf?.length) {
    return buildUnion(schema.anyOf, context, schema.description);
  }

  if (schema.oneOf?.length) {
    return buildUnion(schema.oneOf, context, schema.description);
  }

  if (schema.allOf?.length) {
    return buildIntersection(schema.allOf, context, schema.description);
  }

  if (schema.enum?.length) {
    return buildEnum(schema, schema.description);
  }

  if (schema.const !== undefined) {
    let code = `z.literal(${JSON.stringify(schema.const)})`;
    code = applyDescriptionAndDefault(code, schema);
    return code;
  }

  const nullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) && schema.type.includes('null')) ||
    isExplicitNullSchema(schema);

  const simplifiedType = Array.isArray(schema.type)
    ? schema.type.filter((value): value is string => value !== 'null')
    : schema.type
    ? [schema.type]
    : [];

  let code: string;

  const typeHint = simplifiedType[0];

  if (typeHint === 'string' || (!typeHint && schema.pattern && !schema.properties)) {
    code = buildStringSchema(schema);
  } else if (typeHint === 'integer' || typeHint === 'number') {
    code = buildNumberSchema(schema, typeHint);
  } else if (typeHint === 'boolean') {
    code = 'z.boolean()';
    code = applyDescriptionAndDefault(code, schema);
  } else if (typeHint === 'array') {
    code = buildArraySchema(schema, context);
  } else if (typeHint === 'object' || schema.properties || schema.additionalProperties) {
    code = buildObjectSchema(schema, context);
  } else if (simplifiedType.length > 1) {
    const unionMembers = simplifiedType.map((typeValue) =>
      schemaToZod({ ...schema, type: typeValue } as SchemaObject, context)
    );
    code = buildExplicitUnion(unionMembers, schema.description);
  } else {
    code = 'z.any()';
    code = applyDescriptionAndDefault(code, schema);
  }

  if (nullable && !code.includes('.nullable()')) {
    code += '.nullable()';
  }

  return code;
}

function resolveSchemaReference(schema: SchemaObject): string | undefined {
  const { schemaName } = schema;
  if (typeof schemaName === 'string' && schemaName.length > 0) {
    return `${DOMAIN_SEAM_NAMESPACE}.${schemaName}`;
  }
  return undefined;
}

function buildStringSchema(schema: SchemaObject): string {
  let code = 'z.string()';

  if (schema.format === 'email') {
    code += '.email()';
  }

  if (schema.minLength !== undefined) {
    code += `.min(${schema.minLength})`;
  }

  if (schema.maxLength !== undefined) {
    code += `.max(${schema.maxLength})`;
  }

  if (schema.pattern) {
    code += `.regex(new RegExp(${JSON.stringify(schema.pattern)}))`;
  }

  return applyDescriptionAndDefault(code, schema);
}

function buildNumberSchema(schema: SchemaObject, typeHint: string | undefined): string {
  let code = 'z.number()';
  if (typeHint === 'integer') {
    code += '.int()';
  }

  if (schema.minimum !== undefined) {
    code += `.min(${schema.minimum})`;
  }

  if (schema.maximum !== undefined) {
    code += `.max(${schema.maximum})`;
  }

  if (schema.exclusiveMinimum !== undefined) {
    code += `.gt(${schema.exclusiveMinimum})`;
  }

  if (schema.exclusiveMaximum !== undefined) {
    code += `.lt(${schema.exclusiveMaximum})`;
  }

  return applyDescriptionAndDefault(code, schema);
}

function buildArraySchema(schema: SchemaObject, context: SchemaContext): string {
  const itemSchema = schema.items ? schemaToZod(schema.items, context) : 'z.any()';
  let code = `z.array(${itemSchema})`;

  if (schema.minItems !== undefined) {
    code += `.min(${schema.minItems})`;
  }

  if (schema.maxItems !== undefined) {
    code += `.max(${schema.maxItems})`;
  }

  return applyDescriptionAndDefault(code, schema);
}

function buildObjectSchema(schema: SchemaObject, context: SchemaContext): string {
  const properties = schema.properties ?? {};
  const entries = Object.entries(properties).map(([propertyKey, propertySchema]) => {
    const isRequired = schema.required?.includes(propertyKey) ?? false;
    let propertyCode = schemaToZod(propertySchema, context);
    if (!isRequired) {
      propertyCode += '.optional()';
    }
    return `  ${JSON.stringify(propertyKey)}: ${propertyCode}`;
  });

  let code =
    entries.length > 0 ? `z.object({\n${entries.join(',\n')}\n})` : 'z.object({})';

  if (schema.additionalProperties === false) {
    code += '.strict()';
  } else if (schema.additionalProperties === true) {
    code += '.passthrough()';
  } else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    const additionalSchema = schemaToZod(schema.additionalProperties as SchemaOrRef, context);
    code += `.catchall(${additionalSchema})`;
  }

  return applyDescriptionAndDefault(code, schema);
}

function buildUnion(
  schemas: Array<SchemaOrRef>,
  context: SchemaContext,
  description?: string
): string {
  const nonNullMembers: SchemaOrRef[] = [];
  let includesNull = false;

  for (const member of schemas) {
    if (schemaRepresentsNull(member, context.document)) {
      includesNull = true;
    } else {
      nonNullMembers.push(member);
    }
  }

  if (!nonNullMembers.length) {
    let code = 'z.null()';
    if (description) {
      code += `.describe(${JSON.stringify(description)})`;
    }
    return code;
  }

  if (nonNullMembers.length === 1) {
    let code = schemaToZod(nonNullMembers[0], context);
    if (includesNull) {
      code += '.nullable()';
    }
    if (description) {
      code += `.describe(${JSON.stringify(description)})`;
    }
    return code;
  }

  const memberCodes = nonNullMembers.map((member) => schemaToZod(member, context));
  const unionCode = buildExplicitUnion(memberCodes, description);

  if (includesNull) {
    return `z.union([\n${memberCodes
      .map((code) => `  ${code}`)
      .join(',\n')}\n  z.null()\n])${description ? `.describe(${JSON.stringify(description)})` : ''}`;
  }

  return unionCode;
}

function buildIntersection(
  schemas: Array<SchemaOrRef>,
  context: SchemaContext,
  description?: string
): string {
  const schemaCodes = schemas.map((schema) => schemaToZod(schema, context));
  let code = schemaCodes.reduce((acc, current) => {
    if (!acc) return current;
    return `z.intersection(${acc}, ${current})`;
  }, '');

  if (!code) {
    code = 'z.any()';
  }

  if (description) {
    code += `.describe(${JSON.stringify(description)})`;
  }

  return code;
}

function buildEnum(schema: SchemaObject, description?: string): string {
  const enumValues = schema.enum ?? [];
  const stringValues = enumValues.filter((value) => typeof value === 'string') as string[];
  const nonStringValues = enumValues.filter((value) => typeof value !== 'string');

  if (enumValues.length && stringValues.length === enumValues.length && stringValues.length > 0) {
    const code = `z.enum([${stringValues.map((value) => JSON.stringify(value)).join(', ')}])`;
    return description ? `${code}.describe(${JSON.stringify(description)})` : code;
  }

  const literals = enumValues.map((value) => `z.literal(${JSON.stringify(value)})`);
  let code: string;

  if (literals.length === 1) {
    code = literals[0];
  } else if (literals.length > 1) {
    code = `z.union([\n${literals.map((literal) => `  ${literal}`).join(',\n')}\n])`;
  } else {
    code = 'z.any()';
  }

  if (description) {
    code += `.describe(${JSON.stringify(description)})`;
  }

  return code;
}

function buildExplicitUnion(memberCodes: string[], description?: string): string {
  if (!memberCodes.length) {
    return description ? `z.any().describe(${JSON.stringify(description)})` : 'z.any()';
  }

  if (memberCodes.length === 1) {
    let code = memberCodes[0];
    if (description) {
      code += `.describe(${JSON.stringify(description)})`;
    }
    return code;
  }

  const unionBody = memberCodes.map((code) => `  ${code}`).join(',\n');
  let result = `z.union([\n${unionBody}\n])`;
  if (description) {
    result += `.describe(${JSON.stringify(description)})`;
  }
  return result;
}

function applyDescriptionAndDefault(code: string, schema: SchemaObject): string {
  let result = code;
  if (schema.description) {
    result += `.describe(${JSON.stringify(schema.description)})`;
  }
  if (schema.default !== undefined) {
    result += `.default(${JSON.stringify(schema.default)})`;
  }
  return result;
}

function schemaRepresentsNull(schema: SchemaOrRef, document: OpenAPIObject): boolean {
  if (isReferenceObject(schema)) {
    const resolved = dereference<SchemaObject>(schema, document);
    return schemaRepresentsNull(resolved, document);
  }

  if (!schema) return false;

  if (schema.type === 'null') return true;

  if (Array.isArray(schema.type) && schema.type.includes('null')) {
    return true;
  }

  if (schema.const === null) {
    return true;
  }

  if ((schema.anyOf ?? []).some((member) => schemaRepresentsNull(member, document))) {
    return true;
  }

  if ((schema.oneOf ?? []).some((member) => schemaRepresentsNull(member, document))) {
    return true;
  }

  return false;
}

function isExplicitNullSchema(schema: SchemaObject): boolean {
  if (schema.type === 'null') {
    return true;
  }

  if (Array.isArray(schema.type) && schema.type.includes('null')) {
    return true;
  }

  if (schema.const === null) {
    return true;
  }

  return false;
}

function isReferenceObject(value: unknown): value is ReferenceObject {
  return typeof value === 'object' && value !== null && '$ref' in value && typeof (value as ReferenceObject).$ref === 'string';
}

function dereference<T>(value: T | ReferenceObject, document: OpenAPIObject): T {
  if (!isReferenceObject(value)) {
    return value;
  }

  const resolved = resolveRef(value.$ref, document);
  return resolved as T;
}

function resolveRef(ref: string, document: OpenAPIObject): unknown {
  if (!ref.startsWith('#/')) {
    throw new Error(`Only local $ref values are supported. Received: ${ref}`);
  }

  const pathSegments = ref
    .slice(2)
    .split('/')
    .map(decodePointerSegment);

  return pathSegments.reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    throw new Error(`Unable to resolve JSON pointer ${ref} at segment "${segment}".`);
  }, document);
}

function decodePointerSegment(segment: string): string {
  return segment.replace(/~1/g, '/').replace(/~0/g, '~');
}

function toImportPath(fromDir: string, targetModulePath: string): string {
  let relativePath = path.relative(fromDir, targetModulePath);
  relativePath = relativePath.replace(/\\/g, '/');
  if (!relativePath.startsWith('.')) {
    relativePath = `./${relativePath}`;
  }
  return relativePath.replace(/\.[^/.]+$/, '');
}

function toPascalCase(value: string): string {
  const words = extractWords(value);
  if (!words.length) {
    return 'Generated';
  }
  return words.map(capitalize).join('');
}

function toCamelCase(value: string): string {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebabCase(value: string): string {
  const words = extractWords(value);
  return words.map((word) => word.toLowerCase()).join('-') || 'generated';
}

function extractWords(value: string): string[] {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
