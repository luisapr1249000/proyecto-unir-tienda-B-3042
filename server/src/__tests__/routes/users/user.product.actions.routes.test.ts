import { getOrCreateProduct } from "../../../__fixture__/product.fixture";
import app from "../../../app";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../../constants/constants";
import { disconnectDB, setUpDBForTest } from "../../db/setUpDB";
import { loginAndGetCookies } from "../../helpers/auth.helper";
import { createEndpoint } from "../../helpers/endpoints.helper";
import request from "supertest";

describe("User Product Actions Routes", () => {
  let userId = "";
  let userCookies = "";
  let user2Cookies = "";
  let adminCookies = "";
  let userIdEndpoint = "";
  const userEndpoint = createEndpoint("users");
  let productId = "";

  // let userWishlistNonExistentIdEndpoint = "";
  // let userWishlistNonValidIdEnpoint = "";

  let userWishlistEndpoint = "";
  let userCartEndpoint = "";
  let userCartNonExistentIdEndpoint = "";
  let userCartNonValidIdEnpoint = "";

  let userPOSTWishlistEndpoint = "";
  let userPOSTWishlistNonExistentIdEndpoint = "";
  let userPOSTWishlistNonValidIdEnpoint = "";
  beforeAll(async () => {
    try {
      await setUpDBForTest();

      const { cookies: adminCookie } = await loginAndGetCookies({
        isAdmin: true,
      });
      adminCookies = adminCookie;

      const { user: user1, cookies } = await loginAndGetCookies();
      const { cookies: cookie2 } = await loginAndGetCookies();

      userId = user1._id.toString();
      userCookies = cookies;
      user2Cookies = cookie2;

      userIdEndpoint = createEndpoint("users", `${userId}/cart`);
      productId = (await getOrCreateProduct())._id.toString();

      userWishlistEndpoint = createEndpoint("users", `${userId}/wishlist`);
      userCartEndpoint = createEndpoint("users", `${userId}/cart/${productId}`);
      userCartNonExistentIdEndpoint = createEndpoint(
        "users",
        `${userId}/cart/${NON_EXISTED_OBJECT_ID}`,
      );
      userCartNonValidIdEnpoint = createEndpoint(
        "users",
        `${userId}/cart/${NON_VALID_OBJECT_ID}`,
      );

      userPOSTWishlistEndpoint = createEndpoint(
        "users",
        `${userId}/wishlist/${productId}`,
      );

      userPOSTWishlistNonExistentIdEndpoint = createEndpoint(
        "users",
        `${userId}/wishlist/${NON_EXISTED_OBJECT_ID}`,
      );
      userPOSTWishlistNonValidIdEnpoint = createEndpoint(
        "users",
        `${userId}/wishlist/${NON_VALID_OBJECT_ID}`,
      );

      await request(app)
        .post(`${userWishlistEndpoint}/${productId}`)
        .set("Cookie", userCookies);
    } catch (error) {
      console.error("Error in beforeAll setup:", error);
    }
  });

  afterAll(async () => {
    try {
      await disconnectDB();
    } catch (error) {
      console.error("Error in afterAll cleanup:", error);
    }
  });

  describe(`GET ${userEndpoint}/:userId/cart`, () => {
    const userNonExistentIdEndpoint = createEndpoint(
      "users",
      `${NON_EXISTED_OBJECT_ID}/cart`,
    );
    const userNonValidIdEnpoint = createEndpoint(
      "users",
      `${NON_VALID_OBJECT_ID}/cart`,
    );

    it("should return 200 and retrieve user cart if it is his own cart", async () => {
      const response = await request(app)
        .get(userIdEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(200);
    });

    it("should return 403 if user tries to retrieve cart of another user", async () => {
      const response = await request(app)
        .get(userIdEndpoint)
        .set("Cookie", user2Cookies);
      expect(response.status).toBe(403);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app)
        .get(userNonExistentIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .get(userNonValidIdEnpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(userIdEndpoint);
      expect(response.status).toBe(401);
    });
    it("should return 200 if admin is authenticated and tries to retrieve user cart", async () => {
      const response = await request(app)
        .get(userIdEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
    });
  });

  describe(`POST ${userEndpoint}/:userId/cart/:productId`, () => {
    const usernonExistentCartEndpoint = createEndpoint(
      "users",
      `${NON_EXISTED_OBJECT_ID}/cart/${NON_EXISTED_OBJECT_ID}`,
    );
    const usernonValidCartEndpoint = createEndpoint(
      "users",
      `${NON_VALID_OBJECT_ID}/cart/${NON_EXISTED_OBJECT_ID}`,
    );

    it("should return 200 if user is authenticated and tries to add product to cart", async () => {
      const response = await request(app)
        .post(userCartEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).post(userCartEndpoint);
      expect(response.status).toBe(401);
    });

    it("sbould return 403 if user tries to add product to cart of another user", async () => {
      const response = await request(app)
        .post(userCartEndpoint)
        .set("Cookie", user2Cookies);
      // console.log(response);
      expect(response.status).toBe(403);
    });

    it("should return 404 if product does not exist", async () => {
      const response = await request(app)
        .post(userCartNonExistentIdEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid productId", async () => {
      const response = await request(app)
        .post(userCartNonValidIdEnpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(400);
    });
    it("should return 404 if user does not exist", async () => {
      const response = await request(app)
        .post(usernonExistentCartEndpoint)
        .set("Cookie", adminCookies);
      console.log(response);
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .post(usernonValidCartEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });
  });

  describe("GET /users/:userId/wishlist", () => {
    const userNonExistentWishlistEndpoint = createEndpoint(
      "users",
      `${NON_EXISTED_OBJECT_ID}/wishlist/`,
    );
    const userNonValidWishlistEndpoint = createEndpoint(
      "users",
      `${NON_VALID_OBJECT_ID}/wishlist/`,
    );

    it("should return 200 and retrieve the user wishlist owned by the user", async () => {
      const response = await request(app)
        .get(userWishlistEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
    });

    it("should return 403 if user tries to retrieve wishlist of another user", async () => {
      const response = await request(app)
        .get(userWishlistEndpoint)
        .set("Cookie", user2Cookies);
      expect(response.status).toBe(403);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app)
        .get(userNonExistentWishlistEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .get(userNonValidWishlistEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(userWishlistEndpoint);
      expect(response.status).toBe(401);
    });

    it("should return 200 if admin is authenticated and tries to retrieve user wishlist", async () => {
      const response = await request(app)
        .get(userWishlistEndpoint)
        .set("Cookie", adminCookies);
      console.log(response);
      expect(response.status).toBe(200);
    });
  });

  describe("POST /users/:userId/wishlist/:productId", () => {
    const usernonExistentWishlistEndpoint = createEndpoint(
      "users",
      `${NON_EXISTED_OBJECT_ID}/wishlist/${NON_EXISTED_OBJECT_ID}`,
    );
    const usernonValidWishlistEndpoint = createEndpoint(
      "users",
      `${NON_VALID_OBJECT_ID}/wishlist/${NON_EXISTED_OBJECT_ID}`,
    );

    it("should return 404 if user does not exist", async () => {
      const response = await request(app)
        .post(usernonExistentWishlistEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .post(usernonValidWishlistEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });

    it("should return 200 if user is authenticated and tries to add product to wishlist", async () => {
      const response = await request(app)
        .post(userPOSTWishlistEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
    });

    it("should return 400 if user is not authenticated", async () => {
      const response = await request(app).post(userPOSTWishlistEndpoint);
      expect(response.status).toBe(401);
    });

    it("should return 403 if user tries to add product to wishlist of another user", async () => {
      const response = await request(app)
        .post(userPOSTWishlistEndpoint)
        .set("Cookie", user2Cookies);
      expect(response.status).toBe(403);
    });

    it("should return 404 if product does not exist", async () => {
      const response = await request(app)
        .post(userPOSTWishlistNonExistentIdEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid productId", async () => {
      const response = await request(app)
        .post(userPOSTWishlistNonValidIdEnpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(400);
    });
  });
});
