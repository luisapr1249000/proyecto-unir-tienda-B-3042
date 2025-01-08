import app from "../../../app";
import request from "supertest";
import { disconnectDB, setUpDBForTest } from "../../db/setUpDB";
import { usersAndCookies } from "../../helpers/auth.helper";
import { createEndpoint } from "../../helpers/endpoints.helper";
import { getOrCreateProduct } from "../../../__fixture__/product.fixture";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../../constants/constants";
import {
  askQuestionFixture,
  productQuestionAnswerFixture,
  productQuestionContentFixture,
} from "../../../__fixture__/productQuestions.fixture";

describe("Product Questions Routes", () => {
  let productIdEndpoint = "";
  let userCookies = "";
  let sellerCookies = "";
  let sellerId = "";
  const nonValidProductIdEndpoint = createEndpoint(
    "products",
    `${NON_VALID_OBJECT_ID}/questions`,
  );
  const nonExistedProductEndpoint = createEndpoint(
    "products",
    `${NON_EXISTED_OBJECT_ID}/questions`,
  );
  let userId = "";
  beforeAll(async () => {
    await setUpDBForTest();
    const product = await getOrCreateProduct();
    productIdEndpoint = createEndpoint(
      "products",
      `${product._id.toString()}/questions`,
    );
    const {
      userCookies: _userCookies,
      user: { _id: _userId },
      sellerCookies: _sellerCookies,
      userSeller: { _id: _sellerId },
    } = await usersAndCookies();
    userCookies = _userCookies;
    userId = _userId.toString();
    sellerId = _sellerId.toString();
    sellerCookies = _sellerCookies;
  });

  afterAll(async () => {
    await disconnectDB();
  });
  describe.skip("POST /products/:productId/questions/", () => {
    it("should return 201 and successfully create a user question", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", userCookies)
        .send(productQuestionContentFixture());

      expect(response.status).toBe(201);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .send(productQuestionContentFixture());

      expect(response.status).toBe(401);
    });

    it("should return 400 if no valid id", async () => {
      const response = await request(app)
        .post(nonValidProductIdEndpoint)
        .set("Cookie", userCookies)
        .send(productQuestionContentFixture());

      expect(response.status).toBe(400);
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .post(nonExistedProductEndpoint)
        .set("Cookie", userCookies)
        .send(productQuestionContentFixture());

      expect(response.status).toBe(404);
    });
  });

  describe.skip("PUT /products/:productId/questions/:userQuestionId/", () => {
    let productQuestionIdEndpoint = "";

    let nonValidQuestionIdEndpoint = "";
    let nonExistedQuestionIdEndpoint = "";

    beforeAll(async () => {
      const productQuestion = await askQuestionFixture(userId);
      productQuestionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion?._id?.toString()}/questions/${productQuestion?.productQuestions?.[0]?._id?.toString()}`,
      );

      nonValidQuestionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion._id.toString()}/questions/${NON_VALID_OBJECT_ID}`,
      );
      nonExistedQuestionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion._id.toString()}/questions/${NON_EXISTED_OBJECT_ID}`,
      );
    });

    it("should return 200 and successfully update a user question", async () => {
      const data = productQuestionContentFixture();
      const response = await request(app)
        .put(productQuestionIdEndpoint)
        .set("Cookie", userCookies)
        .send(data);

      console.log("data ---------> ", data);
      console.log("response ---------> ", response);

      expect(response.status).toBe(200);
    });
    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .put(productQuestionIdEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const response = await request(app)
        .put(productQuestionIdEndpoint)
        .send(productQuestionContentFixture());

      expect(response.status).toBe(401);
    });

    it("should return 400 if no valid id", async () => {
      const response = await request(app)
        .put(nonValidQuestionIdEndpoint)
        .set("Cookie", userCookies)
        .send(productQuestionContentFixture());

      expect(response.status).toBe(400);
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .put(nonExistedQuestionIdEndpoint)
        .set("Cookie", userCookies)
        .send(productQuestionContentFixture());

      expect(response.status).toBe(404);
    });
  });

  describe.skip("PUT /products/:productId/questions/:userQuestionId/answer", () => {
    let questionIdEndpoint = "";

    let nonValidQuestionIdEndpoint = "";
    let nonExistedQuestionIdEndpoint = "";

    beforeAll(async () => {
      const productQuestion = await askQuestionFixture(sellerId);
      questionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion?._id?.toString()}/questions/${productQuestion?.productQuestions?.[0]?._id?.toString()}/answer`,
      );

      nonValidQuestionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion._id.toString()}/questions/${NON_VALID_OBJECT_ID}/answer`,
      );
      nonExistedQuestionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion._id.toString()}/questions/${NON_EXISTED_OBJECT_ID}/answer`,
      );
    });

    it("should return 200 and answer a user question", async () => {
      const response = await request(app)
        .put(questionIdEndpoint)
        .set("Cookie", sellerCookies)
        .send(productQuestionAnswerFixture());

      console.log("response ---------> ", response);
      expect(response.status).toBe(200);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .put(questionIdEndpoint)
        .set("Cookie", sellerCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const response = await request(app)
        .put(nonValidQuestionIdEndpoint)
        .send(productQuestionAnswerFixture());

      expect(response.status).toBe(401);
    });

    it("should return 400 if no valid id", async () => {
      const response = await request(app)
        .put(nonValidQuestionIdEndpoint)
        .set("Cookie", sellerCookies)
        .send(productQuestionAnswerFixture());

      expect(response.status).toBe(400);
    });

    it("it should retrun 404 if the question does not exist", async () => {
      const response = await request(app)
        .put(nonExistedQuestionIdEndpoint)
        .set("Cookie", sellerCookies)
        .send(productQuestionAnswerFixture());

      expect(response.status).toBe(404);
    });

    it("should return 403 if the non-owner of the product tries to answer the question", async () => {
      const response = await request(app)
        .put(questionIdEndpoint)
        .set("Cookie", userCookies)
        .send(productQuestionAnswerFixture());

      expect(response.status).toBe(403);
    });
  });

  describe("DELETE /products/:productId/questions/:userQuestionId/", () => {
    let questionIdEndpoint = "";
    let nonExistedQuestionIdEndpoint = "";
    let nonValidQuestionIdEndpoint = "";
    beforeAll(async () => {
      const productQuestion = await askQuestionFixture(sellerId);
      questionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion?._id?.toString()}/questions/${productQuestion?.productQuestions?.[0]?._id?.toString()}`,
      );
      nonExistedQuestionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion._id.toString()}/questions/${NON_EXISTED_OBJECT_ID}`,
      );
      nonValidQuestionIdEndpoint = createEndpoint(
        "products",
        `${productQuestion._id.toString()}/questions/${NON_VALID_OBJECT_ID}`,
      );
    });
    it("should return 204 and successfully delete a user question", async () => {
      const response = await request(app)
        .delete(questionIdEndpoint)
        .set("Cookie", sellerCookies);

      expect(response.status).toBe(204);
    });

    it("should return 400 if no valid id", async () => {
      const response = await request(app)
        .delete(nonValidQuestionIdEndpoint)
        .set("Cookie", sellerCookies);

      expect(response.status).toBe(400);
    });

    it("should return 404 if the question does not exist", async () => {
      const response = await request(app)
        .delete(nonExistedQuestionIdEndpoint)
        .set("Cookie", sellerCookies);

      expect(response.status).toBe(404);
    });

    it("should return 401 if auth token is missing", async () => {
      const response = await request(app)
        .delete(questionIdEndpoint)
        .send(productQuestionAnswerFixture());

      expect(response.status).toBe(401);
    });
  });
});
