export const booleanQueryParam = (
  value?: boolean,
): undefined | 'true' | 'false' => {
  if (value === undefined) {
    return undefined;
  }

  if (value === false) {
    return 'false';
  }

  return 'true';
};
