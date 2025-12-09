import request, { Agent, Response, Request } from 'superagent';

/**
 * Captures call site information from the stack trace
 * Returns the first stack frame that's in a test file
 */
function getCallSite(): { file: string; line: number; column: number } | null {
  const stack = new Error().stack;
  if (!stack) return null;

  const lines = stack.split('\n');
  // Skip the first few lines (Error, getCallSite, wrapper functions)
  // Look for the first line that's in a test file
  for (let i = 3; i < lines.length; i++) {
    const line = lines[i];
    // Match stack trace format: "    at functionName (file:line:column)" or "    at file:line:column"
    const match = line.match(/\(([^)]+):(\d+):(\d+)\)/) || line.match(/at .+ \(([^)]+):(\d+):(\d+)\)/) || line.match(/at ([^:]+):(\d+):(\d+)/);
    if (match) {
      const file = match[1];
      const lineNum = parseInt(match[2], 10);
      const column = parseInt(match[3], 10);
      // Only return if it's a test file
      if (file.includes('tests/') || file.includes('.test.') || file.includes('.spec.')) {
        return { file, line: lineNum, column };
      }
    }
  }
  return null;
}

/**
 * Enhances an error with call site information
 */
function enhanceError(error: any, method: string, url: string): any {
  const callSite = getCallSite();
  if (callSite) {
    const context = `${method.toUpperCase()} ${url}`;
    const location = `${callSite.file}:${callSite.line}:${callSite.column}`;
    const originalMessage = error.message || 'Request failed';
    
    // Create a new error with enhanced message
    const enhancedError = new Error(`${originalMessage}\n  Request: ${context}\n  Location: ${location}`);
    
    // Preserve the original stack but add our context
    if (error.stack) {
      const stackLines = error.stack.split('\n');
      // Find where the original error message appears in the stack
      const originalErrorIndex = stackLines.findIndex(line => line.includes(originalMessage));
      if (originalErrorIndex >= 0) {
        // Insert our enhanced message before the original error
        stackLines.splice(originalErrorIndex, 0, enhancedError.message);
      } else {
        // If we can't find it, prepend our message
        stackLines.unshift(enhancedError.message);
      }
      enhancedError.stack = stackLines.join('\n');
    } else {
      enhancedError.stack = enhancedError.message;
    }
    
    // Preserve other error properties
    Object.keys(error).forEach(key => {
      if (key !== 'message' && key !== 'stack') {
        (enhancedError as any)[key] = error[key];
      }
    });
    
    return enhancedError;
  }
  return error;
}

/**
 * Wraps a superagent request to add better error context
 * The key is to capture the call site when the request method is called,
 * then enhance errors when they occur during promise resolution
 */
function wrapRequest<T extends Request>(req: T, method: string, url: string): T {
  // Superagent requests are thenable (they have a .then() method)
  // We need to wrap both the .then() method and ensure errors are enhanced
  
  // Store the original then method if it exists
  const originalThen = (req as any).then;
  
  if (originalThen) {
    // Wrap the .then() method to catch and enhance errors
    (req as any).then = function (onFulfilled?: (res: Response) => any, onRejected?: (err: any) => any) {
      return originalThen.call(
        this,
        onFulfilled,
        (err: any) => {
          const enhanced = enhanceError(err, method, url);
          if (onRejected) {
            return onRejected(enhanced);
          }
          throw enhanced;
        }
      );
    };
    
    // Wrap .catch() if it exists
    const originalCatch = (req as any).catch;
    if (originalCatch) {
      (req as any).catch = function (onRejected?: (err: any) => any) {
        return originalCatch.call(this, (err: any) => {
          const enhanced = enhanceError(err, method, url);
          if (onRejected) {
            return onRejected(enhanced);
          }
          throw enhanced;
        });
      };
    }
  }

  // Also wrap the .end() method for callback-style usage
  const originalEnd = req.end.bind(req);
  req.end = function (cb?: (err: any, res: Response) => void): Request {
    if (cb) {
      return originalEnd((err: any, res: Response) => {
        if (err) {
          const enhanced = enhanceError(err, method, url);
          cb(enhanced, res);
        } else {
          cb(err, res);
        }
      });
    } else {
      // When called without callback, it returns a promise
      const promise = originalEnd();
      if (promise && typeof promise.then === 'function') {
        return promise.catch((err: any) => {
          throw enhanceError(err, method, url);
        }) as any;
      }
      return promise;
    }
  } as any;

  return req;
}

/**
 * Wrapper around superagent that provides better error messages with call site information
 */
export const testRequest = {
  get(url: string): Request {
    return wrapRequest(request.get(url), 'get', url);
  },

  post(url: string): Request {
    return wrapRequest(request.post(url), 'post', url);
  },

  put(url: string): Request {
    return wrapRequest(request.put(url), 'put', url);
  },

  delete(url: string): Request {
    return wrapRequest(request.delete(url), 'delete', url);
  },

  patch(url: string): Request {
    return wrapRequest(request.patch(url), 'patch', url);
  },

  head(url: string): Request {
    return wrapRequest(request.head(url), 'head', url);
  },

  agent(): TestAgent {
    return new TestAgent();
  },
};

/**
 * Wrapper around superagent Agent that provides better error messages
 */
class TestAgent {
  private agent: Agent;

  constructor() {
    this.agent = request.agent();
  }

  get(url: string): Request {
    return wrapRequest(this.agent.get(url), 'get', url);
  }

  post(url: string): Request {
    return wrapRequest(this.agent.post(url), 'post', url);
  }

  put(url: string): Request {
    return wrapRequest(this.agent.put(url), 'put', url);
  }

  delete(url: string): Request {
    return wrapRequest(this.agent.delete(url), 'delete', url);
  }

  patch(url: string): Request {
    return wrapRequest(this.agent.patch(url), 'patch', url);
  }

  head(url: string): Request {
    return wrapRequest(this.agent.head(url), 'head', url);
  }
}

