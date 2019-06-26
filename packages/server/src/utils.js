export const mergeResolvers = (...args) => {
  const Query = args.reduce((acc, { query }) => query ? ({ ...acc, ...query }) : acc, {});
  const Mutation = args.reduce((acc, { mutation }) => mutation ? ({ ...acc, ...mutation }) : acc, {});
  const Subscription = args.reduce((acc, { subscription }) => subscription ? ({ ...acc, ...subscription }) : acc, {});

  return { Query, Mutation, Subscription };
};
