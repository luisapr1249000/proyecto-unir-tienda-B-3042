import app from "../../app";
import request from "supertest";
import { setUpDBForTest, disconnectDB } from "../db/setUpDB";
import {
  createReportFixture,
  generateReportDataFixture,
  generateReportResolution,
} from "../../__fixture__/report.fixture";
import { getOrCreateReport } from "../../__fixture__/report.fixture";
import { createEndpoint } from "../helpers/endpoints.helper";
import { getOrCreateProduct } from "../../__fixture__/product.fixture";
import {
  createReviewFixture,
  getOrCreateReview,
} from "../../__fixture__/review.fixture";
import { usersAndCookies } from "../helpers/auth.helper";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../constants/constants";
import { getOrCreateUser } from "../../__fixture__/user.fixture";
describe("Reports Routes", () => {
  let reportedProductEndpoint: string;
  let reportedReviewEndpoint: string;
  let userCookies = "";
  let adminCookies = "";

  const reportEndpoint = createEndpoint("reports");

  beforeAll(async () => {
    await setUpDBForTest();
    const { userCookies: _userCookies, adminCookies: _adminCookies } =
      await usersAndCookies();
    adminCookies = _adminCookies;
    userCookies = _userCookies;
    const { _id: productId } = await getOrCreateProduct();
    reportedProductEndpoint = createEndpoint("reports", productId.toString());
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe.skip("GET /reports", () => {
    beforeAll(async () => {
      await createReportFixture();
    });
    it("should return 200 and get all reports if user is admin", async () => {
      const response = await request(app)
        .get(reportEndpoint)
        .set("Cookie", adminCookies);
      console.log("response", response);
      expect(response.status).toBe(200);
    });

    it("should return 403 if user is not admin", async () => {
      const response = await request(app)
        .get(reportEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(403);
    });

    it("should return 401 if user is not logged in", async () => {
      const response = await request(app).get(reportEndpoint);
      expect(response.status).toBe(401);
    });
  });

  describe.skip("GET /reports/:reportId", () => {
    let reportIdEndpoint = "";
    beforeAll(async () => {
      const report = await getOrCreateReport();
      reportIdEndpoint = createEndpoint("reports", report._id.toString());
    });
    it("should return 200 and get a report by id if user is admin", async () => {
      const response = await request(app)
        .get(reportIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(200);
    });
    it("should return 404 if report does not exist", async () => {
      const response = await request(app)
        .get(createEndpoint("reports", NON_EXISTED_OBJECT_ID))
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });

    it("should return 400 if no valid id", async () => {
      const response = await request(app)
        .get(createEndpoint("reports", NON_VALID_OBJECT_ID))
        .set("Cookie", userCookies);
      expect(response.status).toBe(400);
    });
    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(reportIdEndpoint);

      expect(response.status).toBe(401);
    });
  });

  describe.skip("GET /reports/products/:productId", () => {
    let reportProductEndpoint = "";

    beforeAll(async () => {
      const product = await getOrCreateProduct();
      reportProductEndpoint = createEndpoint(
        "reports",
        `products/${product._id.toString()}`,
      );

      await createReportFixture({
        itemType: "Product",
        reportedItem: product._id.toString(),
      });
    });

    it("should return 200 and get all reports for a product if user is admin", async () => {
      const response = await request(app)
        .get(reportProductEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
    });
    it("should return 404 if product does not exist", async () => {
      const nonExistentProductId = createEndpoint(
        "reports",
        `products/${NON_EXISTED_OBJECT_ID}`,
      );
      const response = await request(app)
        .get(nonExistentProductId)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(404);
    });

    it("should return 400 if productId is not a valid ObjectId", async () => {
      const invalidProductId = createEndpoint(
        "reports",
        `products/${NON_VALID_OBJECT_ID}`,
      );
      const response = await request(app)
        .get(invalidProductId)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });
    it("should return 403 if user is not admin", async () => {
      const response = await request(app)
        .get(reportProductEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(403);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(reportProductEndpoint);
      expect(response.status).toBe(401);
    });
  });

  describe.skip("GET /reports/reviews/:reviewId", () => {
    let reportReviewEndpoint = "";
    beforeAll(async () => {
      const review = await getOrCreateReview();
      reportReviewEndpoint = createEndpoint(
        "reports",
        `reviews/${review._id.toString()}`,
      );
      await createReportFixture({
        itemType: "Review",
        reportedItem: review._id.toString(),
      });
    });

    it("should return 200 and get all reports for a review if user is admin", async () => {
      const response = await request(app)
        .get(reportReviewEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
    });
    it("should return 404 if review does not exist", async () => {
      const nonExistentReviewId = createEndpoint(
        "reports",
        `reviews/${NON_EXISTED_OBJECT_ID}`,
      );
      const response = await request(app)
        .get(nonExistentReviewId)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(404);
    });

    it("should return 400 if reviewId is not a valid ObjectId", async () => {
      const invalidReviewId = createEndpoint(
        "reports",
        `reviews/${NON_VALID_OBJECT_ID}`,
      );
      const response = await request(app)
        .get(invalidReviewId)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });

    it("should return 403 if user is not admin", async () => {
      const response = await request(app)
        .get(reportReviewEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(403);
    });
    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(reportReviewEndpoint);
      expect(response.status).toBe(401);
    });
  });

  describe.skip("GET /reports/users/:userId", () => {
    let reportUserEndpoint = "";
    let userCookies = "";
    let userCookies2 = "";
    beforeAll(async () => {
      const {
        user,
        userCookies: _userCookies,
        sellerCookies: _sellerCookies,
      } = await usersAndCookies();
      userCookies2 = _sellerCookies;
      userCookies = _userCookies;
      reportUserEndpoint = createEndpoint(
        "reports",
        `users/${user._id.toString()}`,
      );
      await createReportFixture({
        reporter: user._id.toString(),
      });
    });

    it("should return 200 and get all reports for a user if user is reporter", async () => {
      const response = await request(app)
        .get(reportUserEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
    });

    it("should return 200 and get all reports for a user if user is admin", async () => {
      const response = await request(app)
        .get(reportUserEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
    });
    it("should return 404 if user does not exist", async () => {
      const nonExistentUserId = createEndpoint(
        "reports",
        `users/${NON_EXISTED_OBJECT_ID}`,
      );
      const response = await request(app)
        .get(nonExistentUserId)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(404);
    });
    it("should return 400 if userId is not a valid ObjectId", async () => {
      const invalidUserId = createEndpoint(
        "reports",
        `users/${NON_VALID_OBJECT_ID}`,
      );
      const response = await request(app)
        .get(invalidUserId)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });
    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(reportUserEndpoint);
      expect(response.status).toBe(401);
    });
    it("should return 403 if user is not admin or reporter", async () => {
      const response = await request(app)
        .get(reportUserEndpoint)
        .set("Cookie", userCookies2);
      expect(response.status).toBe(403);
    });
  });

  describe.skip("POST /reports/:reportId/", () => {
    it("should return 201 and create a new report for a product", async () => {
      const report = generateReportDataFixture();
      const { _id } = await getOrCreateProduct();
      const data = {
        reportedItem: _id.toString(),
        reason: report.reason,
        itemType: "Product",
        problemDescription: report.problemDescription,
      };
      console.log(data);
      const response = await request(app)
        .post(reportedProductEndpoint)
        .set("Cookie", userCookies)
        .send(data);

      console.log("response ----> ", response.body);
      expect(response.status).toBe(201);
    });
    it("should return 201 and create a new report for a review", async () => {
      const report = generateReportDataFixture();
      const { _id: reviewId } = await createReviewFixture();
      reportedReviewEndpoint = createEndpoint("reports", reviewId.toString());
      const response = await request(app)
        .post(reportedReviewEndpoint)
        .set("Cookie", userCookies)
        .send({
          reason: report.reason,
          itemType: "Review",
          problemDescription: report.problemDescription,
        });
      console.log("response ----> ", response.body);

      expect(response.status).toBe(201);
    });

    it("should return 400 if user tries to create two reports for the same item", async () => {
      const userId = (await getOrCreateUser())._id.toString();
      const productId = (await getOrCreateProduct())._id.toString();
      await createReportFixture({
        reporter: userId,
        itemType: "Product",
        reportedItem: productId,
      });

      const response = await request(app)
        .post(reportedProductEndpoint)
        .set("Cookie", userCookies)
        .send({
          reason: "Spam",
          itemType: "Product",
          problemDescription: "test",
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post(reportedProductEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(400);
    });

    it("should return 400 if no valid report item is provided", async () => {
      const invalidReportItem = createEndpoint("reports", "invalid");
      const response = await request(app)
        .post(invalidReportItem)
        .set("Cookie", userCookies)
        .send(generateReportDataFixture());
      expect(response.status).toBe(400);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).post(reportedProductEndpoint);
      expect(response.status).toBe(401);
    });
  });

  describe.skip("PUT /reports/:reportId", () => {
    let reportIdEndpoint = "";
    beforeAll(async () => {
      const report = await getOrCreateReport();
      reportIdEndpoint = createEndpoint("reports", report._id.toString());
    });
    it("should return 200 and update a report if user is admin", async () => {
      const response = await request(app)
        .put(reportIdEndpoint)
        .set("Cookie", adminCookies)
        .send(generateReportResolution());
      expect(response.status).toBe(200);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .put(reportIdEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).put(reportIdEndpoint);
      expect(response.status).toBe(401);
    });

    it("should return 403 if user is not admin", async () => {
      const response = await request(app)
        .put(reportIdEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(403);
    });
    it("should return 404 if report does not exist", async () => {
      const response = await request(app)
        .put(createEndpoint("reports", NON_EXISTED_OBJECT_ID))
        .set("Cookie", adminCookies)
        .send(generateReportResolution());
      console.log("response", response.body);
      expect(response.status).toBe(404);
    });
    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .put(createEndpoint("reports", "invalid"))
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /reports/:reportId", () => {
    let reportIdEndpoint = "";
    beforeEach(async () => {
      const report = await getOrCreateReport();
      reportIdEndpoint = createEndpoint("reports", report._id.toString());
    });
    it("should return 204 and delete a report successfully if user is admin", async () => {
      const response = await request(app)
        .delete(reportIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(204);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).delete(reportIdEndpoint);
      expect(response.status).toBe(401);
    });
    it("should return 403 if user is not admin", async () => {
      const response = await request(app)
        .delete(reportIdEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(403);
    });
    it("should return 404 if report does not exist", async () => {
      const response = await request(app)
        .delete(createEndpoint("reports", NON_EXISTED_OBJECT_ID))
        .set("Cookie", adminCookies);
      expect(response.status).toBe(404);
    });
    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .delete(createEndpoint("reports", "invalid"))
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });
  });
});
