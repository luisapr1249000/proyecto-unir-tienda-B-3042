import { getOrCreateProduct } from "../../__fixture__/product.fixture";
import { getOrCreateUser } from "../../__fixture__/user.fixture";
import { Order } from "../../models/orders.model";
import { NON_EXISTED_OBJECT_ID } from "../constants/constants";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";
import { getOrCreateOrder } from "../../__fixture__/order.fixture";

describe("Order Model", () => {
  let productId: string;
  let userId: string;

  beforeAll(async () => {
    await setUpDBForTest();
    const { _id } = await getOrCreateProduct();
    productId = _id.toString();
    userId = await getOrCreateUser();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should create an order", async () => {
    const orderItem = {
      product: productId,
      quantity: 2,
      price: 10,
      seller: NON_EXISTED_OBJECT_ID,
    };
    const totalPriceCalculated = orderItem.price * orderItem.quantity;
    const order = new Order({
      custemer: userId,
      finalPrice: totalPriceCalculated,
      orderItems: [orderItem],
    });
    const orderSaved = await order.save();

    expect(orderSaved).toBeDefined();
    expect(orderSaved._id).toBeDefined();
    expect(orderSaved.finalPrice).toBe(totalPriceCalculated);
    expect(orderSaved.orderItems).toBeDefined();
    expect(orderSaved.status).toBe("pending");
  });

  it("should read an order by id", async () => {
    const orderId = await getOrCreateOrder();
    const fetchedOrder = await Order.findById(orderId);
    expect(fetchedOrder).toBeDefined();
    expect(fetchedOrder?._id.toString()).toBe(orderId);
  });

  it("should update an order", async () => {
    const orderId = await getOrCreateOrder();
    const fetchedOrder = await Order.findById(orderId);
    expect(fetchedOrder).toBeDefined();
    expect(fetchedOrder?._id.toString()).toBe(orderId);

    await Order.updateOne({ _id: orderId }, { status: "shipped" });
    const updatedOrder = await Order.findById(orderId);
    expect(updatedOrder).toBeDefined();
    expect(updatedOrder?._id.toString()).toBe(orderId);
  });

  it("should delete an order", async () => {
    const orderId = await getOrCreateOrder();
    const fetchedOrder = await Order.findById(orderId);
    expect(fetchedOrder).toBeDefined();
    expect(fetchedOrder?._id.toString()).toBe(orderId);

    await Order.deleteOne({ _id: orderId });
    const deletedOrder = await Order.findById(orderId);
    expect(deletedOrder).toBeNull();
  });
});
