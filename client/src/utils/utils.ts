export const hasData = (data: unknown) => {
  if (data === undefined || data === null) return false;
  if (typeof data === "string" || Array.isArray(data)) return data.length > 0;
  return false;
};

export const isEmptyString = (string: string) => {
  switch (string) {
    case "":
      return "No data";
    case undefined:
      return "No data";
    case null:
      return "No data";
    default:
      return "No data";
  }
};
