import app from "../../../app";
import request from "supertest";
import { disconnectDB, setUpDBForTest } from "../../db/setUpDB";
import { usersAndCookies } from "../../helpers/auth.helper";
import {
  concatEndpoints,
  createEndpoint,
  createQueryEndpoint,
} from "../../helpers/endpoints.helper";
import {
  createProductByCategoryFixture,
  createProductFixture,
  generateProductFixture,
} from "../../../__fixture__/product.fixture";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../../constants/constants";
import { createCategoryFixture } from "../../../__fixture__/category.fixture";
import { getOrCreateUser } from "../../../__fixture__/user.fixture";

describe("Product Routes", () => {
  const productEndpoint = createEndpoint("products");
  let productIdEndpoint = "";
  let userId = "";
  let sellerCookies = "";
  let userCookies = "";
  let adminCookies = "";
  let productData = {};
  let adminUserId = "";

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
    const {
      userSeller,
      adminUser,
      adminCookies: _adminCookie,
      userCookies: _userCookies,
      sellerCookies: _sellerCookies,
    } = await usersAndCookies();

    userId = userSeller._id.toString();
    adminUserId = adminUser._id.toString();
    sellerCookies = _sellerCookies;

    userCookies = _userCookies;

    adminCookies = _adminCookie;
    productData = await generateProductFixture();
    const product = await createProductFixture(userId);
    productIdEndpoint = concatEndpoints(
      productEndpoint,
      product._id.toString(),
    );
    console.log("productIdEnpoint------> ", productIdEndpoint);
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe("GET /products (with pagination)", () => {
    it("should return 200 and retrieve paginated list of products", async () => {
      const response = await request(app).get(productEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 404 if no products found on page", async () => {
      const response = await request(app).get(
        createQueryEndpoint(productEndpoint, "10000"),
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
      const category = await createCategoryFixture(adminUserId);
      for (const _ of Array.from({ length: 10 })) {
        await createProductByCategoryFixture(category._id.toString());
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

      expect(response.status).toBe(400);
    });
  });

  describe("GET /products/author/:userId", () => {
    let getProductsByAuthorEndpoint = "";
    const getProductsByAuthorNoValidIdEndpoint = createEndpoint(
      "products",
      `author/${NON_VALID_OBJECT_ID}`,
    );
    const getProductsByAuthorNonexistedIdEndpoint = createEndpoint(
      "products",
      `author/${NON_EXISTED_OBJECT_ID}`,
    );
    beforeAll(async () => {
      const user = await getOrCreateUser();
      getProductsByAuthorEndpoint = createEndpoint(
        "products",
        `author/${user._id.toString()}`,
      );
      for (const _ of Array.from({ length: 5 })) {
        await createProductFixture(user._id.toString());
      }
    });

    it("should return 200 and retrieve products by the specified author with pagination", async () => {
      const response = await request(app).get(getProductsByAuthorEndpoint);

      expect(response.status).toBe(200);
    });

    it("should return 404 if the specified author has no products", async () => {
      const response = await request(app).get(
        createQueryEndpoint(getProductsByAuthorEndpoint, "1000"),
      );

      console.log("response ---------> ", response);

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

      expect(response.status).toBe(400);
    });
  });

  describe(`POST ${productEndpoint}`, () => {
    it("should return 201 and successfully create a product with valid data if user is seller", async () => {
      const response = await request(app)
        .post(productEndpoint)
        .set("Cookie", sellerCookies)
        .send(productData);

      console.log("response ---------> ", response);
      expect(response.status).toBe(201);
    });

    it("should return 201 and successfully create a product with valid data if user is admin", async () => {
      const response = await request(app)
        .post(productEndpoint)
        .set("Cookie", adminCookies)
        .send(productData);

      expect(response.status).toBe(201);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post(productEndpoint)
        .set("Cookie", sellerCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const response = await request(app)
        .post(productEndpoint)
        .send(productData);

      expect(response.status).toBe(401);
    });

    it("should return 403 if user is not seller", async () => {
      const response = await request(app)
        .post(productEndpoint)
        .set("Cookie", userCookies)
        .send(productData);

      expect(response.status).toBe(403);
    });
  });

  describe(`PUT ${productEndpoint}/:productId`, () => {
    it("should return 200 if successfully update a product with valid data", async () => {
      console.log("product data", productData);
      const response = await request(app)
        .put(productIdEndpoint)
        .set("Cookie", sellerCookies)
        .send(productData);

      console.log("response ---------> ", response);
      expect(response.status).toBe(200);
    });

    it("should return 200 if admin update any product", async () => {
      const response = await request(app)
        .put(productIdEndpoint)
        .set("Cookie", adminCookies)
        .send(productData);

      expect(response.status).toBe(200);
    });

    it("should return 403 if a non-owner, non-admin user tries to update the product", async () => {
      const response = await request(app)
        .put(productIdEndpoint)
        .set("Cookie", userCookies)
        .send(productData);

      expect(response.status).toBe(403);
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .put(nonExistedProductEndpoint)
        .set("Cookie", adminCookies)
        .send(productData);

      expect(response.status).toBe(404);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post(productEndpoint)
        .set("Cookie", sellerCookies);

      expect(response.status).toBe(400);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .put(nonValidProductIdEndpoint)
        .set("Cookie", adminCookies)
        .send(productData);

      expect(response.status).toBe(400);
    });

    it("should return 401 if not auth", async () => {
      const response = await request(app)
        .put(productIdEndpoint)
        .send(productData);

      expect(response.status).toBe(401);
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
        .set("Cookie", sellerCookies);

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
        .set("Cookie", userCookies);

      expect(response.status).toBe(403);
    });

    it("should return 404 if the product does not exist", async () => {
      const response = await request(app)
        .delete(nonExistedProductEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .delete(nonValidProductIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if not auth", async () => {
      const response = await request(app)
        .delete(deleteProductEndpoint)
        .send(productData);

      expect(response.status).toBe(401);
    });
  });
});
