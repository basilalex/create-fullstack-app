export const pipe = (...fns) => arg => fns.reduce((v, fn) => fn(v), arg);
