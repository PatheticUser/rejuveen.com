export function eventFactory(eventName, payload = {}) {
  try {
    return new CustomEvent(eventName, {
      detail: payload,
    });
  } catch (err) {
    return new Error(err);
  }
}

export function areArraysEqual(array1: string[], array2: string[]): boolean {
  const sortedArray2 = array2.slice().sort();
  return (
    array1.length === array2.length &&
    array1
      .slice()
      .sort()
      .every((value, index) => value === sortedArray2[index])
  );
}

export function isArrayEmpty(array: string[]): boolean {
  return array.length === 0;
}
