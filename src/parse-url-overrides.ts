type Overrides = {
  [key: string]: boolean;
};

export function parseUrlOverrides(queryString: string): Overrides {
  return Array.from(new URLSearchParams(queryString).entries()).reduce(
    (final, [k, v]) => ({
      ...final,
      [k]: v === 'true' || v === '1',
    }),
    {},
  );
}
