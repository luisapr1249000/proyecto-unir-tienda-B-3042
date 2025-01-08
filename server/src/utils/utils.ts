export const replaceWhitespace = (str: string) => str.replace(/\s/g, "-");

export const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const normalizeString = (str: string) => {
  const noWhitespace = replaceWhitespace(str);
  return removeAccents(noWhitespace);
};

export const generateUniqueValue = (originalName: string) => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomSuffix}-${originalName}`;
};

export const getDefaultPaginationOptions = () => ({
  page: 1,
  limit: 10,
  sort: "-createdAt",
});

export const twoDigitsFixed = (num: number) => num.toFixed(2);
