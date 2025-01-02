import request from "supertest";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";
import app from "../../app";
import { createEndpoint } from "../helpers/endpoints.helper";
import { getOrCreateProduct } from "../../__fixture__/product.fixture";
import {
  generateReviewFixture,
  getOrCreateReview,
} from "../../__fixture__/review.fixture";
import { NON_EXISTED_OBJECT_ID } from "../constants/constants";
import { loginAndGetCookies } from "../helpers/auth.helper";
import { getOrCreateUser } from "../../__fixture__/user.fixture";

describe("Review Routes", () => {
  let reviewEndpoint = "";
  const reviewEndpointNoValidProductId = createEndpoint(
    "reviews",
    "invalidId/reviews",
  );
  const reviewEndpointNoExistentProductId = createEndpoint(
    "reviews",
    `${NON_EXISTED_OBJECT_ID}/reviews`,
  );

  let reviewId = "";
  let reviewIdEndpoint = "";
  let user1Cookies = "";
  let user2Cookies = "";
  let userAdminCookies = "";
  const nonValidReviewIdEndpoint = createEndpoint(
    "reviews",
    "invalidId/reviews",
  );
  const nonExistentReviewIdEndpoint = createEndpoint(
    "reviews",
    `${NON_EXISTED_OBJECT_ID}/reviews`,
  );

  beforeAll(async () => {
    await setUpDBForTest();
    const { _id: productId } = await getOrCreateProduct();
    reviewEndpoint = createEndpoint("reviews", `${productId}/reviews`);
    const { _id } = await getOrCreateReview();
    reviewId = _id.toString();
    reviewIdEndpoint = createEndpoint(
      "reviews",
      `${productId}/reviews/${_id.toString()}`,
    );
    user1Cookies = (await loginAndGetCookies()).cookies;
    user2Cookies = (await loginAndGetCookies()).cookies;
    userAdminCookies = (await loginAndGetCookies({ isAdmin: true })).cookies;
  });
  beforeAll(async () => {
    await disconnectDB();
  });

  describe(`POST product/:productId/reviews`, () => {
    it("should return 201 and create a new review successfully", async () => {
      const data = generateReviewFixture();
      const response = await request(app)
        .set("Cookie", user1Cookies)
        .post(reviewEndpoint)
        .send(data);
      expect(response.status).toBe(201);
    });

    it("should return 400 error if review is not valid", async () => {
      const response = await request(app)
        .set("Cookie", user1Cookies)
        .post(reviewEndpoint)
        .send({ content: "invalid content" });
      expect(response.status).toBe(400);
    });

    it("should return 401 error if user is not authenticated", async () => {
      const response = await request(app).post(reviewEndpoint);
      expect(response.status).toBe(401);
    });

    it("should return 400 if not valid product id", async () => {
      const response = await request(app)
        .post(nonValidReviewIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(generateReviewFixture());

      expect(response.status).toBe(400);
    });
    it("should return 404 if product does not exist", async () => {
      const response = await request(app)
        .post(nonExistentReviewIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(generateReviewFixture());

      expect(response.status).toBe(404);
    });
  });

  describe(`PUT product/:productId/reviews/:reviewId`, () => {
    it("should return 200 and update a review successfully", async () => {
      const data = generateReviewFixture();
      const response = await request(app)
        .set("Cookie", user1Cookies)
        .put(reviewIdEndpoint)
        .send(data);
      expect(response.status).toBe(200);
    });

    it("should return 400 error if review is not valid", async () => {
      const response = await request(app)
        .set("Cookie", user1Cookies)
        .post(reviewEndpoint)
        .send({ content: "invalid content" });
      expect(response.status).toBe(400);
    });

    it("should return 401 error if user is not authenticated", async () => {
      const response = await request(app).post(reviewEndpoint);
      expect(response.status).toBe(401);
    });
    it("should return 400 if not valid product id", async () => {
      const response = await request(app)
        .post(nonValidReviewIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(generateReviewFixture());

      expect(response.status).toBe(400);
    });
    it("should return 404 if product does not exist", async () => {
      const response = await request(app)
        .post(nonExistentReviewIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(generateReviewFixture());

      expect(response.status).toBe(404);
    });
  });

  describe(`DELETE product/:productId/reviews/:reviewId`, () => {
    let reviewIdEndpoint = "";
    beforeEach(async () => {
      const review = await getOrCreateReview();
      reviewIdEndpoint = createEndpoint(
        "reviews",
        `${review.product._id.toString()}/reviews/${review._id.toString()}`,
      );
    });
    it("should return 204 and delete a review successfully", async () => {
      const response = await request(app)
        .delete(reviewIdEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(204);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).delete(reviewIdEndpoint);
      expect(response.status).toBe(401);
    });

    it("should return 400 if not valid product id", async () => {
      const response = await request(app)
        .delete(nonValidReviewIdEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(400);
    });

    it("should return 404 if product does not exist", async () => {
      const response = await request(app)
        .delete(nonExistentReviewIdEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(404);
    });
  });

  describe(`GET  product/:productId/reviews`, () => {
    it("should return 200 and get all reviews from a product successfully", async () => {
      const response = await request(app).get(reviewEndpoint);
      expect(response.status).toBe(200);
    });
    it("should return 404 error if product is not found", async () => {
      const response = await request(app).get(
        reviewEndpointNoExistentProductId,
      );
      expect(response.status).toBe(404);
    });
    it("should return 400 error if no valid product id is provided", async () => {
      const response = await request(app).get(reviewEndpointNoValidProductId);
      expect(response.status).toBe(400);
    });
    it("should return 400 error if no valid pagination is provided", async () => {
      const response = await request(app).get(`${reviewEndpoint}?page=invalid`);
      expect(response.status).toBe(400);
    });
  });

  describe("GET product/:productId/reviews/:reviewId", () => {
    it("should return 200 and get a review successfully", async () => {
      const response = await request(app).get(reviewIdEndpoint);
      expect(response.status).toBe(200);
    });
    it("should return 400 if product does not exist", async () => {
      const route = `${nonExistentReviewIdEndpoint}/${reviewId}`;
      const response = await request(app)
        .get(route)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(400);
    });
    it("should return 400 if review does not exist", async () => {
      const route = `${reviewEndpoint}/${NON_EXISTED_OBJECT_ID}`;
      const response = await request(app)
        .get(route)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(400);
    });
  });

  describe("GET reviews", () => {
    const reviewEndpoint = createEndpoint("reviews");
    it("should return 200 and get all reviews successfully with pagination if is admin", async () => {
      const response = await request(app)
        .set("Cookie", userAdminCookies)
        .get(reviewEndpoint);
      expect(response.status).toBe(200);
    });
    it("should return 403 if user is not authenticated", async () => {
      const response = await request(app).get(reviewEndpoint);
      expect(response.status).toBe(403);
    });

    it("should return 403 if user is not admin and is trying to get all reviews", async () => {
      const response = await request(app)
        .set("Cookie", user1Cookies)
        .get(reviewEndpoint);
      expect(response.status).toBe(403);
    });

    it("should return 400 if no valid pagination is provided", async () => {
      const response = await request(app).get(`${reviewEndpoint}?page=invalid`);
      expect(response.status).toBe(400);
    });
    it("should return 404 if no reviews are found", async () => {
      const response = await request(app).get(`${reviewEndpoint}?page=1000`);
      expect(response.status).toBe(404);
    });
  });

  describe("GET reviews/users/:userId", async () => {
    const userId = (await getOrCreateUser())._id;
    const reviewEndpoint = createEndpoint("reviews", `users/${userId}`);
    it("should return 200 and get all reviews successfully with pagination if is admin", async () => {
      const response = await request(app)
        .set("Cookie", userAdminCookies)
        .get(reviewEndpoint);
      expect(response.status).toBe(200);
    });
    it("should return 403 if user is not authenticated", async () => {
      const response = await request(app).get(reviewEndpoint);
      expect(response.status).toBe(403);
    });

    it("should return 403 if user is not admin and is trying to get all reviews", async () => {
      const response = await request(app)
        .set("Cookie", user1Cookies)
        .get(reviewEndpoint);
      expect(response.status).toBe(403);
    });
    it("should return 404 if no reviews are found", async () => {
      const response = await request(app).get(`${reviewEndpoint}?page=1000`);
      expect(response.status).toBe(404);
    });
  });
});
