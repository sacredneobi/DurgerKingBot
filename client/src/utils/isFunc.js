const isFunc = function (fn, ...args) {
  if (typeof fn === "function") {
    return fn(...args);
  }
  return null;
};

const isFuncDef = function (fn, def, ...args) {
  if (typeof fn === "function") {
    return fn(...args);
  }
  return def;
};

export { isFunc, isFuncDef };
