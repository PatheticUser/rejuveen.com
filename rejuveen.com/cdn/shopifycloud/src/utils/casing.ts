export function toCamelCase(value: string): string {
  return value.replace(/[-:_]([a-z])/g, (_, val) => `${val.toUpperCase()}`);
}

export function toDashedCase(value: string): string {
  return value
    .replace(
      /([a-z0-9])([A-Z])/g,
      (_, prefix, camelChar) => `${prefix}-${camelChar.toLowerCase()}`,
    )
    .replace(/[\s_]+/g, '-');
}

/**
 * Replaces all capital letters with a lowercase letter prefixed with an underscore.
 */
export function toSnakeCase(value: string): string {
  return value
    .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
    .replace(/^_/, '');
}
