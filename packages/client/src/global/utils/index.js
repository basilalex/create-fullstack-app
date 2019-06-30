export * from './module';

export const pipe = (...fns) => arg => fns.reduce((a, fn) => fn(a), arg);

export const compose = (...fns) => fns.reduce((a, fn) => (...args) => a(fn(...args)), arg => arg);

export const removeDuplicates = dirty => [ ...new Set(dirty) ];

export const flatten = dirty => [].concat(...dirty);

export const flattenDeep = dirty => dirty.reduce((acc, item) =>
  acc.concat(Array.isArray(item) ? flatten(item) : item), []);

export const merge = (...args) => [].concat(...args);

export const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [ ...arr, [ item ] ]
      : [ ...arr.slice(0, -1), [ ...arr.slice(-1)[ 0 ], item ] ];
  }, []);
};

export const sortBy = (key) => {
  return (a, b) => (a[ key ] > b[ key ]) ? 1 : ((b[ key ] > a[ key ]) ? -1 : 0);
};
