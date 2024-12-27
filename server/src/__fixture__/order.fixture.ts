import { faker } from "@faker-js/faker/.";
import { Order } from "../models/orders.model";
import { getOrCreateProduct } from "./product.fixture";
import { getOrCreateUser } from "./user.fixture";

export const getTotalOrderCount = async () => {
  return await Order.countDocuments().exec();
};

const generateOrderFixture = async () => {
  const random = faker.number.int({ min: 1, max: 100 });
  const orderItemsPromise = Array.from({ length: random }, async () => {
    const product = await getOrCreateProduct();
    return {
      product: product._id,
      quantity: faker.number.int({ min: 1, max: product.quantity }),
      price: product.finalPrice,
      seller: product.author,
    };
  });

  const orderItems = await Promise.all(orderItemsPromise);
  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return {
    customer: await getOrCreateUser(),
    finalPrice: totalPrice,
    orderItems,
  };
};

export const createOrderFixture = async () => {
  const data = generateOrderFixture();
  const order = new Order(data);

  await order.save();
  console.log("Order fixture created:", order);

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
