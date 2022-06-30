import React from "react";

function isObject(object) {
  return object != null && typeof object === "object";
}

function areEqualObject(prev, next) {
  const keys1 = Object.keys(prev);
  const keys2 = Object.keys(next);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = prev[key];
    const val2 = next[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !areEqualObject(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}

function areEqualTest(prev, next) {
  const keys1 = Object.keys(prev);
  const keys2 = Object.keys(next);
  if (keys1.length !== keys2.length) {
    console.log(`length not equal: prev=${keys1.length} next=${keys2.length}`);
    return false;
  }

  for (const key of keys1) {
    const val1 = prev[key];
    const val2 = next[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !areEqualTest(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      console.log(
        `prevKey: ${key} - ${prev[key]}`,
        `nextKey: ${key} - ${next[key]}`
      );
    }
  }

  for (const key of keys1) {
    const val1 = prev[key];
    const val2 = next[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !areEqualTest(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}

function areAlwaysEqual(prev, next) {
  return true;
}

const testReRender = (component) => {
  return React.memo(component, areEqualTest);
};

function areEqualAlways(prev, next) {
  return true;
}

export { areEqualObject, areAlwaysEqual, areEqualAlways };

export default testReRender;
