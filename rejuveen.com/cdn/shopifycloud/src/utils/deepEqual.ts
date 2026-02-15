export function deepEqual(objectA: any, objectB: any): boolean {
  if (objectA === objectB) {
    return true;
  }

  if (typeof objectA !== typeof objectB) {
    return false;
  }

  if (
    typeof objectA === 'function' &&
    objectA.toString?.() !== undefined &&
    objectA.toString?.() === objectB.toString?.()
  ) {
    return true;
  }

  if (
    objectA &&
    objectB &&
    typeof objectA === 'object' &&
    typeof objectB === 'object'
  ) {
    if (objectA.constructor !== objectB.constructor) {
      return false;
    }

    let length;
    let i;
    const keys = Object.keys(objectA);

    if (Array.isArray(objectA)) {
      length = objectA.length;
      if (length !== objectB.length) return false;
      for (i = length; i-- !== 0; )
        if (!deepEqual(objectA[i], objectB[i])) return false;
      return true;
    }

    if (objectA.valueOf !== Object.prototype.valueOf)
      return objectA.valueOf() === objectB.valueOf();
    if (objectA.toString !== Object.prototype.toString)
      return objectA.toString() === objectB.toString();

    length = keys.length;
    if (length !== Object.keys(objectB).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(objectB, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (!deepEqual(objectA[key], objectB[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  // eslint-disable-next-line no-self-compare
  return objectA !== objectA && objectB !== objectB;
}
