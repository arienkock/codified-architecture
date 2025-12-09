/**
 * Jest setup file that patches JSON serialization to handle circular references.
 * This prevents "Converting circular structure to JSON" errors in Jest worker processes
 * when serializing test results or errors that contain circular references.
 * 
 * This file is loaded via setupFilesAfterEnv in jest.config.ts.
 */

// Store original JSON.stringify
const originalStringify = JSON.stringify;

// Create a safe stringify function that handles circular references
// Matches JSON.stringify signature exactly
function safeStringify(
  value: unknown,
  replacer?: ((key: string, value: unknown) => unknown) | Array<string | number> | null,
  space?: string | number
): string {
  const seen = new WeakSet();
  
  const circularReplacer = (key: string, val: unknown): unknown => {
    // First apply user's replacer if provided (and it's a function)
    let processedVal = val;
    if (replacer && typeof replacer === 'function') {
      processedVal = replacer(key, val);
      // If user's replacer returns undefined, skip this property
      if (processedVal === undefined) {
        return undefined;
      }
    }
    
    // Skip common circular reference properties in HTTP objects
    if (key === 'socket' || key === '_httpMessage' || key === 'res' || key === 'req') {
      return '[HTTP Object]';
    }
    
    // Check for circular references
    if (processedVal !== null && typeof processedVal === 'object') {
      if (seen.has(processedVal as object)) {
        return '[Circular]';
      }
      seen.add(processedVal as object);
    }
    
    return processedVal;
  };

  try {
    // If replacer is an array, combine it with circular reference handling
    if (Array.isArray(replacer)) {
      const combinedReplacer = (key: string, val: unknown): unknown => {
        // First check if key should be included based on array replacer
        if (!replacer.includes(key)) {
          return undefined;
        }
        // Then apply circular reference handling
        return circularReplacer(key, val);
      };
      return originalStringify(value, combinedReplacer, space);
    }
    
    // Use the circular replacer (which respects function replacer if provided)
    return originalStringify(value, circularReplacer, space);
  } catch (error) {
    // If stringify still fails, try to return a safe representation
    if (error instanceof Error && error.message.includes('circular')) {
      try {
        return originalStringify({ 
          error: 'Circular reference detected',
          type: typeof value,
          constructor: value?.constructor?.name || 'Unknown'
        }, null, space);
      } catch {
        return '"[Circular Reference]"';
      }
    }
    // Re-throw if it's not a circular reference error
    throw error;
  }
}

// Patch JSON.stringify globally for Jest's internal use
// This runs in each Jest worker process, so it will affect Jest's internal serialization
if (typeof global !== 'undefined') {
  // Store original for potential restoration
  (global as any).__originalJSONStringify = originalStringify;
  
  // Only patch in test environment to avoid affecting production code
  // This will affect Jest's worker processes since setupFilesAfterEnv runs in each worker
  if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined) {
    // Actually patch JSON.stringify to use our safe version
    // This will help Jest's internal serialization when communicating between workers
    JSON.stringify = safeStringify as typeof JSON.stringify;
    
    // Also provide as a utility for tests if needed
    (global as any).__safeJSONStringify = safeStringify;
  }
}

// Export for use in tests if needed
export { safeStringify };

