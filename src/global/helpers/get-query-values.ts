export function getQueryValues(queryKeys: string[]) {
  const params = new URLSearchParams(window.location.search);

  return queryKeys.reduce(
    (acc, key) => {
      acc[key] = params.get(key);
      return acc;
    },
    {} as Record<string, string | null>,
  );
}
