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

export const isAdmin = (role: string) => role === "admin";

export const isOwner = ({
  authorId,
  userId,
}: {
  authorId: string;
  userId: string;
}): boolean => userId === authorId;

export const isOwnerOrAdmin = ({
  role,
  userId,
  authorId,
}: {
  role: string;
  userId: string;
  authorId: string;
}) => isAdmin(role) || isOwner({ authorId, userId });
