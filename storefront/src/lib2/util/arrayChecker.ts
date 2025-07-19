export const converterCheckerArray = (value: string | string[] | undefined) => {
  return !value ? undefined : Array.isArray(value) ? value : [value];
};
