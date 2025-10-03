import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { document } from '../src/webServer/openapi.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../src/webServer/generated');
const outputFilePath = path.join(outputDir, 'openapi.json');

(async () => {
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFilePath, JSON.stringify(document, null, 2), 'utf8');
  console.log(`OpenAPI document written to ${outputFilePath}`);
})();
