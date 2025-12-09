/**
 * Jest custom serializer that handles circular references in objects.
 * This prevents "Converting circular structure to JSON" errors when Jest
 * tries to serialize test results or errors containing circular references
 * (e.g., HTTP response objects from superagent).
 */

type Serializer = {
  test: (val: unknown) => boolean;
  print: (val: unknown, serialize: (val: unknown) => string) => string;
};

const circularSerializer: Serializer = {
  test: (val: unknown): boolean => {
    // Check if the value is an object or array that might contain circular references
    return (
      val !== null &&
      typeof val === 'object' &&
      (Array.isArray(val) || Object.prototype.toString.call(val) === '[object Object]')
    );
  },
  print: (val: unknown, serialize: (val: unknown) => string): string => {
    const seen = new WeakSet();
    
    const safeStringify = (obj: unknown, depth = 0): string => {
      // Prevent infinite recursion
      if (depth > 100) {
        return '[Max Depth Exceeded]';
      }

      if (obj === null) {
        return 'null';
      }

      if (typeof obj === 'undefined') {
        return 'undefined';
      }

      if (typeof obj !== 'object') {
        return String(obj);
      }

      // Check for circular reference
      if (seen.has(obj as object)) {
        return '[Circular]';
      }

      seen.add(obj as object);

      try {
        if (Array.isArray(obj)) {
          const items = (obj as unknown[]).map((item, index) => {
            try {
              return safeStringify(item, depth + 1);
            } catch {
              return `[Error serializing array item at index ${index}]`;
            }
          });
          seen.delete(obj as object);
          return `[${items.join(', ')}]`;
        }

        // Handle objects
        const keys = Object.keys(obj as Record<string, unknown>);
        const pairs = keys.map((key) => {
          try {
            const value = (obj as Record<string, unknown>)[key];
            // Skip common circular reference properties
            if (key === 'socket' || key === '_httpMessage' || key === 'res' || key === 'req') {
              return `${key}: [HTTP Object]`;
            }
            return `${key}: ${safeStringify(value, depth + 1)}`;
          } catch {
            return `${key}: [Error serializing value]`;
          }
        });
        seen.delete(obj as object);
        return `{${pairs.join(', ')}}`;
      } catch (error) {
        seen.delete(obj as object);
        return `[Error: ${error instanceof Error ? error.message : String(error)}]`;
      }
    };

    return safeStringify(val);
  },
};

export default circularSerializer;

