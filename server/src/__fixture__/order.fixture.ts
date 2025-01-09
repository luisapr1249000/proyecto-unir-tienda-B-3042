import { faker } from "@faker-js/faker";
import { Order } from "../models/orders.model";
import { getOrCreateProduct } from "./product.fixture";
import { getOrCreateUser } from "./user.fixture";
import { twoDigitsFixed } from "../utils/utils";
import { createAddressFixture } from "./addressDirection.fixture";

export const getTotalOrderCount = async () => {
  return await Order.countDocuments().exec();
};

export const generateOrderFixture = async () => {
  const random = faker.number.int({ min: 1, max: 5 });

  const orderItemsPromise = Array.from({ length: random }).map(async () => {
    const product = await getOrCreateProduct();
    const quantity = faker.number.int({ min: 1, max: product.quantity });
    const subtotal = twoDigitsFixed(product.finalPrice * quantity);
    return {
      product: product?._id,
      quantity: quantity,
      price: product.finalPrice,
      seller: product?.author,
      subtotal: subtotal,
    };
  });

  const orderItems = await Promise.all(orderItemsPromise);
  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return {
    totalPrice: twoDigitsFixed(totalPrice),
    orderItems,
    shippingAddress: createAddressFixture(),
  };
};

export const createOrderFixture = async (userId?: string) => {
  const data = await generateOrderFixture();
  // console.log("data", data);
  const order = new Order({
    ...data,
    customer: userId ?? (await getOrCreateUser()),
  });
  // console.log("order", order);
  await order.save();
  return order;
};

export const getOrCreateOrder = async () => {
  const random = faker.number.int({
    min: 0,
    max: await getTotalOrderCount(),
  });

  let order = await Order.findOne().skip(random).exec();
  if (!order) {
    order = await createOrderFixture();
  }

  return order._id.toString();
};
