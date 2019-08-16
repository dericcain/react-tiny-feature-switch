type Overrides = {
  [key: string]: boolean;
};

export function parseUrlOverrides(queryString: string): Overrides {
  const paramEntries = new URLSearchParams(queryString).entries();
  const overrides: Overrides = {};
  for (let [k, v] of paramEntries) {
    overrides[k] = v === 'true' || v === '1';
  }
  return overrides;
}
