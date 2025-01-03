import app from "../../app";
import request from "supertest";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../constants/constants";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";
import { loginAndGetCookies } from "../helpers/auth.helper";
import {
  createProductData,
  createProductFixture,
} from "../../__fixtures__/product.fixture";
import { createCategoryFixture } from "../../__fixtures__/category.fixture";
import {
  createEndpoint,
  createQueryEndpoint,
} from "../helpers/endpoints.helper";

describe("Product Routes", () => {
  const productEndpoint = createEndpoint("products");
  let productIdEndpoint = "";
  let productId = "";
  let userId = "";
  let user1Cookies = "";
  let user2Cookies = "";
  let adminCookies = "";
  let productData = {};

  const nonValidProductIdEndpoint = createEndpoint(
    "products",
    NON_VALID_OBJECT_ID,
  );
  const nonExistedProductEndpoint = createEndpoint(
    "products",
    NON_EXISTED_OBJECT_ID,
  );

  beforeAll(async () => {
    await setUpDBForTest();

    const { user, cookies } = await loginAndGetCookies({ isSeller: true });
    userId = user._id.toString();
    user1Cookies = cookies;

    const { cookies: user2Cookie } = await loginAndGetCookies();
    user2Cookies = user2Cookie;

    const { cookies: admCookie } = await loginAndGetCookies({ isAdmin: true });
    adminCookies = admCookie;

    const product = await createProductFixture(userId);
    productId = product._id.toString();
    productIdEndpoint = createEndpoint("products", productId);
    productData = await createProductData();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe(`POST ${productEndpoint}`, async () => {
    it("should return 200 and successfully create a product with valid data", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(productData);

      expect(response.status).toBe(201);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .send(productData);

      expect(response.status).toBe(401);
    });

    it("should return 403 if user is not seller", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", user2Cookies)
        .send(productData);

      expect(response.status).toBe(403);
    });
  });

  describe(`PUT ${productId}/:productId`, () => {
    it("should return 200 if successfully update a product with valid data", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(productData);

      expect(response.status).toBe(200);
    });

    it("should return 200 if admin update any product", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", adminCookies)
        .send(productData);

      expect(response.status).toBe(200);
    });

    it("should return 403 if a non-owner, non-admin user tries to update the product", async () => {
      const productData = await createProductData();

      const response = await request(app)
        .post(productIdEndpoint)
        .set("Cookie", user2Cookies)
        .send(productData);

      expect(response.status).toBe(403);
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .post(nonExistedProductEndpoint)
        .set("Cookie", user1Cookies)
        .send(productData);

      expect(response.status).toBe(404);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .post(nonValidProductIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(productData);

      expect(response.status).toBe(400);
    });

    it("should return 401 if not cookies", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .send(productData);

      expect(response.status).toBe(400);
    });
  });

  describe(`DELETE ${productEndpoint}/:productId`, () => {
    let productIdToDelete = "";
    let deleteProductEndpoint = "";
    beforeEach(async () => {
      const product = await createProductFixture(userId);
      productIdToDelete = product._id.toString();
      deleteProductEndpoint = createEndpoint("products", productIdToDelete);
    });

    it("should return 204 if user deletes a product", async () => {
      const response = await request(app)
        .delete(deleteProductEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(204);
    });

    it("should return 204 if admin deletes a product", async () => {
      const response = await request(app)
        .delete(deleteProductEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(204);
    });
    it("should return 403 if a non-owner, non-admin user tries to delete the product", async () => {
      const response = await request(app)
        .delete(deleteProductEndpoint)
        .set("Cookie", user2Cookies);

      expect(response.status).toBe(204);
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .delete(nonExistedProductEndpoint)
        .set("Cookie", user1Cookies)
        .send(productData);

      expect(response.status).toBe(404);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .delete(nonValidProductIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(productData);

      expect(response.status).toBe(400);
    });

    it("should return 401 if not cookies", async () => {
      const response = await request(app)
        .post(productIdEndpoint)
        .send(productData);

      expect(response.status).toBe(400);
    });
  });
  describe("GET /products/author/:userId", () => {
    const getProductsByAuthorEndpoint = createEndpoint(
      "products",
      `author/${userId}`,
    );
    const getProductsByAuthorNoValidIdEndpoint = createEndpoint(
      "products",
      `author/${NON_VALID_OBJECT_ID}`,
    );
    const getProductsByAuthorNonexistedIdEndpoint = createEndpoint(
      "products",
      `author/${NON_EXISTED_OBJECT_ID}`,
    );
    beforeAll(async () => {
      for (const _ of Array.from({ length: 10 })) {
        await createProductFixture(userId);
      }
    });

    it("should return 200 and retrieve products by the specified author with pagination", async () => {
      const response = await request(app).get(getProductsByAuthorEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 200 and retrieve the second page of products by the author with pagination", async () => {
      const response = await request(app).get(
        createQueryEndpoint(getProductsByAuthorEndpoint, "2", "1"),
      );

      expect(response.status).toBe(200);
    });
    it("should return 404 if the specified author has no products", async () => {
      const response = await request(app).get(
        createQueryEndpoint(getProductsByAuthorEndpoint, "1000", "1"),
      );

      expect(response.status).toBe(404);
    });

    it("should return 404 if the author does not exist", async () => {
      const response = await request(app).get(
        getProductsByAuthorNonexistedIdEndpoint,
      );

      expect(response.status).toBe(404);
    });

    it("should return 400 if no valid id", async () => {
      const response = await request(app).get(
        getProductsByAuthorNoValidIdEndpoint,
      );

      expect(response.status).toBe(404);
    });
  });
  describe(`GET ${productEndpoint}/:productId`, () => {
    it("should return 200 and retrieve product successfully by ID", async () => {
      const response = await request(app).get(productIdEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 400 for invalid product id", async () => {
      const response = await request(app).get(nonValidProductIdEndpoint);

      expect(response.status).toBe(400);
    });

    it("should return 404 if product does not exist", async () => {
      const response = await request(app).get(nonExistedProductEndpoint);

      expect(response.status).toBe(404);
    });
  });

  describe(`GET ${productEndpoint}/category/:categoryId`, () => {
    let getProductsByCategoryEndpoint = "";
    const getProductsByAuthorNoValidIdEndpoint = createEndpoint(
      "products",
      `category/${NON_VALID_OBJECT_ID}`,
    );
    const getProductsByAuthorNonexistedIdEndpoint = createEndpoint(
      "products",
      `category/${NON_EXISTED_OBJECT_ID}`,
    );

    beforeAll(async () => {
      const category = await createCategoryFixture(userId);
      for (const _ of Array.from({ length: 10 })) {
        await createProductFixture(userId, category._id.toString());
      }
      getProductsByCategoryEndpoint = createEndpoint(
        "products",
        `category/${category._id.toString()}`,
      );
    });
    it("should retrieve products by category ID with pagination and populated fields", async () => {
      const response = await request(app).get(getProductsByCategoryEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 404 if no products are found for the category", async () => {
      const response = await request(app)
        .get(getProductsByCategoryEndpoint)
        .query({ page: "200" });

      expect(response.status).toBe(404);
    });

    it("should return 404 if the category does not exist", async () => {
      const response = await request(app).get(
        getProductsByAuthorNonexistedIdEndpoint,
      );

      expect(response.status).toBe(404);
    });

    it("should return 400 if no valid id", async () => {
      const response = await request(app).get(
        getProductsByAuthorNoValidIdEndpoint,
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /products (with pagination)", () => {
    it("should return 200 and retrieve paginated list of products", async () => {
      const response = await request(app).get(productEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 404 if no products found on page", async () => {
      const response = await request(app).get(
        createQueryEndpoint(productEndpoint, "1"),
      );

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid pagination parameters", async () => {
      const response = await request(app).get(
        createQueryEndpoint(productEndpoint, "fwerfwr"),
      );

      expect(response.status).toBe(400);
    });
  });
});
