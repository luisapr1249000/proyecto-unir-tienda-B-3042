export const canUpdateOrder = (
  authUserId: string,
  userRole: string,
  order: { customer: string; orderItems: { seller: string }[] },
  status: string,
): boolean => {
  const isCustomer = authUserId === order.customer.toString();
  const isAdmin = userRole === "admin";

  const isSeller = order.orderItems.some(
    (item) => item.seller.toString() === authUserId,
  );

  if (isAdmin) return true;
  if (isCustomer && status === "cancelled") return true;
  if (isSeller && ["shipped", "processing"].includes(status)) return true;

  return false;
};
