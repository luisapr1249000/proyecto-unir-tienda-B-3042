import app from "../../app";
import request from "supertest";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";
import { usersAndCookies } from "../helpers/auth.helper";
import {
  createOrderFixture,
  generateOrderFixture,
} from "../../__fixture__/order.fixture";
import { concatEndpoints, createEndpoint } from "../helpers/endpoints.helper";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../constants/constants";

describe("Order Routes", () => {
  let userId = "";
  let orderEndpoint = createEndpoint("orders");
  // let orderIdEndpoint = "";

  let userCookies = "";
  let userCookies2 = "";
  let adminCookies = "";
  beforeAll(async () => {
    await setUpDBForTest();
    const {
      userCookies: _userCookies,
      sellerCookies: _sellerCookies,
      adminCookies: _adminCookies,
      user: { _id },
    } = await usersAndCookies();
    userCookies = _userCookies;
    userCookies2 = _sellerCookies;
    adminCookies = _adminCookies;
    userId = _id.toString();
  });
  afterAll(async () => {
    await disconnectDB();
  });

  describe.skip("POST /orders", () => {
    it("should return 201 and successfully create a order", async () => {
      const orderInput = await generateOrderFixture();
      // console.log("orderInput ---------> ", orderInput);

      const response = await request(app)
        .post(orderEndpoint)
        .set("Cookie", userCookies)
        .send(orderInput);

      // console.log("response ---------> ", response);

      expect(response.status).toBe(201);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post(orderEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const orderInput = await generateOrderFixture();

      const response = await request(app).post(orderEndpoint).send(orderInput);

      expect(response.status).toBe(401);
    });
  });

  describe("PUT /orders/:orderId", () => {
    let orderIdEndpoint = "";
    let orderId = "";
    beforeAll(async () => {
      const order = await createOrderFixture(userId);
      orderId = order._id.toString();

      const orderItemId = order?.orderItems?.[0]?._id.toString();
      orderIdEndpoint = concatEndpoints(
        orderEndpoint,
        `${order._id.toString()}/orderItem/${orderItemId}`,
      );
    });
    it("should return 200 and successfully update an order status", async () => {
      const orderInput = { status: "cancelled" };
      const response = await request(app)
        .put(orderIdEndpoint)
        .set("Cookie", userCookies)
        .send(orderInput);

      expect(response.status).toBe(200);
    });

    it("should return 200 and successfully update an order status if admin", async () => {
      const orderInput = { status: "cancelled" };
      const response = await request(app)
        .put(orderIdEndpoint)
        .set("Cookie", adminCookies)
        .send(orderInput);

      expect(response.status).toBe(200);
    });

    it("should return 403 if non-owner tries to update order status", async () => {
      const orderInput = { status: "cancelled" };
      const response = await request(app)
        .put(orderIdEndpoint)
        .set("Cookie", userCookies2)
        .send(orderInput);

      expect(response.status).toBe(403);
    });
    it("shoul return 400 if status is not valid", async () => {
      const orderInput = {
        status: "invalid",
      };

      const response = await request(app)
        .put(orderIdEndpoint)
        .set("Cookie", userCookies)
        .send(orderInput);

      expect(response.status).toBe(400);
    });

    it("shoul return 404 if order does not exist", async () => {
      const orderInput = {
        status: "pending",
      };

      const orderIdEndpoint = concatEndpoints(
        orderEndpoint,
        `${NON_EXISTED_OBJECT_ID}/orderItem/${NON_EXISTED_OBJECT_ID}`,
      );

      const response = await request(app)
        .put(orderIdEndpoint)
        .set("Cookie", userCookies)
        .send(orderInput);

      expect(response.status).toBe(404);
    });

    it("shoul return 404 if orderItem does not exist", async () => {
      const orderInput = {
        status: "pending",
      };

      const orderIdEndpoint = concatEndpoints(
        orderEndpoint,
        `${orderId}/orderItem/${NON_EXISTED_OBJECT_ID}`,
      );

      const response = await request(app)
        .put(orderIdEndpoint)
        .set("Cookie", userCookies)
        .send(orderInput);

      console.log(response.body);

      expect(response.status).toBe(404);
    });

    it("shoul return 400 if orderItem is not valid", async () => {
      const orderInput = {
        status: "pending",
      };

      const orderIdEndpoint = concatEndpoints(
        orderEndpoint,
        `${orderId}/orderItem/${NON_VALID_OBJECT_ID}`,
      );

      const response = await request(app)
        .put(orderIdEndpoint)
        .set("Cookie", userCookies)
        .send(orderInput);

      expect(response.status).toBe(400);
    });
  });
  describe.skip("DELETE /api/orders/:id", () => {
    let orderId = "";
    let orderIdEndpoint = "";
    const nonExistentOrderId = createEndpoint("orders", NON_EXISTED_OBJECT_ID);
    const nonValidOrderId = createEndpoint("orders", NON_VALID_OBJECT_ID);
    beforeEach(async () => {
      const order = await createOrderFixture();
      orderId = order._id.toString();
      orderIdEndpoint = concatEndpoints(orderEndpoint, orderId);
    });

    it("should return 204 if order is deleted", async () => {
      const response = await request(app)
        .delete(orderIdEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(204);
    });

    it("should return 404 if order does not exist", async () => {
      const response = await request(app)
        .delete(nonExistentOrderId)
        .set("Cookie", userCookies);

      expect(response.status).toBe(404);
    });

    it("should return 400 if orderId is not valid", async () => {
      const response = await request(app)
        .delete(nonValidOrderId)
        .set("Cookie", userCookies);

      expect(response.status).toBe(400);
    });
  });
});
