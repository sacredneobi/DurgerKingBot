const getValue = (obj, path) =>
  path
    .replace(/\[([^[\]]*)]/g, ".$1.")
    .split(".")
    .filter((prop) => prop !== "")
    .reduce(
      (prev, next) => (prev instanceof Object ? prev[next] : undefined),
      obj
    );

// getValue({ a: { b: { c: 'd' } } }, '1.b.c'); // = d
// getValue({ a: { b: { c: [1, 2] } } }, 'a.b.c[1]'); // = 2

const clamp = (min, max, value) => {
  if (min > max) throw new Error("min cannot be greater than max");
  return value < min ? min : value > max ? max : value;
};

const sleep = async (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const groupBy = (fn, list) =>
  list.reduce(
    (prev, next) => ({
      ...prev,
      [fn(next)]: [...(prev[fn(next)] || []), next],
    }),
    {}
  );

const collectBy = (fn, list) => Object.values(groupBy(fn, list));

const flatten = (list) =>
  list.reduce(
    (prev, next) => [
      ...prev,
      ...(Array.isArray(next) ? flatten(next) : [next]),
    ],
    []
  );

const indexBy = (fn, list) =>
  list.reduce(
    (prev, next) => ({
      ...prev,
      [fn(next)]: next,
    }),
    {}
  );

const differenceBy = (fn, listA, listB) => {
  const bIndex = indexBy(fn, listB);
  return listA.filter((val) => !bIndex[fn(val)]);
};

const sumBy = (fn, list) => list.reduce((prev, next) => prev + fn(next), 0);

const ascending = (fn) => (a, b) => {
  const valA = fn(a);
  const valB = fn(b);
  return valA < valB ? -1 : valA > valB ? 1 : 0;
};

const descending = (fn) => (a, b) => {
  const valA = fn(b);
  const valB = fn(a);
  return valA < valB ? -1 : valA > valB ? 1 : 0;
};

const bifurcateBy = (fn, list) =>
  list.reduce(
    (acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc),
    [[], []]
  );

export {
  getValue,
  groupBy,
  sleep,
  clamp,
  collectBy,
  flatten,
  indexBy,
  differenceBy,
  sumBy,
  ascending,
  descending,
  bifurcateBy,
};
