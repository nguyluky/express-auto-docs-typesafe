export function expressToSwaggerPath(expressPath: string) {
  // Replace Express-style :param with Swagger-style {param}
  const swaggerPath = expressPath
    // Match :param or :param? (optional parameters)
    .replace(/:([^\/]+)/g, '{$1}')
    // Remove trailing ? for optional parameters
    .replace(/\{\([^\/]+\)\?\}/g, '{$1}')
    // Handle Express regex patterns (basic conversion)
    .replace(/\(\?:([^\)]+)\)\?/g, '$1')
    // Clean up any remaining parentheses
    .replace(/[()]/g, '');

  return swaggerPath;
}
