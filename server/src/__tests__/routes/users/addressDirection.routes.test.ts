import request from "supertest";
import app from "../../../app";
import { disconnectDB, setUpDBForTest } from "../../db/setUpDB";
import { loginAndGetCookies, usersAndCookies } from "../../helpers/auth.helper";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../../constants/constants";
import { createEndpoint } from "../../helpers/endpoints.helper";
import { createAddressFixture } from "../../../__fixture__/addressDirection.fixture";

describe("Address Directions Routes", () => {
  let addressDirectionEndpoint = "";
  let user1Cookies = "";
  let user2Cookies = "";
  let adminCookies = "";
  let addressDirectionData = {};
  let addressDirectionId = "";
  let addressDirectionIdEndpoint = "";

  let invalidAddressDirectionIdEndpoint = "";
  let nonexistedAddressDirectionIdEndpoint = "";
  beforeAll(async () => {
    await setUpDBForTest();
    const {
      user,
      userCookies,
      sellerCookies: cookie2,
      adminCookies: adminCookie,
    } = await usersAndCookies();

    user1Cookies = userCookies;
    user2Cookies = cookie2;
    adminCookies = adminCookie;

    addressDirectionId = user.addressDirections[0]
      ? user.addressDirections[0]._id.toString()
      : "";
    addressDirectionEndpoint = createEndpoint(
      "users",
      `${user._id}/address-direction/`,
    );
    addressDirectionIdEndpoint = createEndpoint(
      "users",
      `${user._id}/address-direction/${addressDirectionId}`,
    );
    invalidAddressDirectionIdEndpoint = createEndpoint(
      "users",
      `${user._id}/address-direction/${NON_VALID_OBJECT_ID}`,
    );
    nonexistedAddressDirectionIdEndpoint = createEndpoint(
      "users",
      `${user._id}/address-direction/${NON_EXISTED_OBJECT_ID}`,
    );
  });

  beforeEach(async () => {
    addressDirectionData = createAddressFixture();
  });

  afterAll(async () => {
    try {
      await disconnectDB();
    } catch (error) {
      console.error("Error in afterAll cleanup:", error);
    }
  });

  describe(`POST ${addressDirectionEndpoint}`, () => {
    const nonexistedAddressDirectionIdEndpoint = createEndpoint(
      "users",
      `${NON_EXISTED_OBJECT_ID}/address-direction`,
    );
    const invalidAddressDirectionIdEndpoint = createEndpoint(
      "users",
      `${NON_VALID_OBJECT_ID}/address-direction`,
    );
    it("should return 201 and create a new address direction for the authenticated user", async () => {
      const response = await request(app)
        .post(addressDirectionEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);
      expect(response.status).toBe(201);
    });

    it("should return 400 if validation fails", async () => {
      const response = await request(app)
        .post(addressDirectionEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(400);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).post(addressDirectionEndpoint);
      expect(response.status).toBe(401);
    });

    it("should return 403 if user tries to create address direction of another user", async () => {
      const response = await request(app)
        .post(addressDirectionEndpoint)
        .set("Cookie", user2Cookies);
      expect(response.status).toBe(403);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app)
        .post(nonexistedAddressDirectionIdEndpoint)
        .set("Cookie", adminCookies)
        .send(addressDirectionData);
      console.log(response);
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .post(invalidAddressDirectionIdEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(400);
    });
  });

  describe(`PUT ${addressDirectionEndpoint}/:addressDirectionId`, () => {
    it("should return 200 and update an address direction for the authenticated user", async () => {
      const response = await request(app)
        .put(addressDirectionIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);

      expect(response.status).toBe(200);
    });
    it("should return 403 if user tries to update address direction of another user", async () => {
      const response = await request(app)
        .put(addressDirectionIdEndpoint)
        .set("Cookie", user2Cookies)
        .send(addressDirectionData);

      expect(response.status).toBe(403);
    });
    it("should return 400 if validation fails", async () => {
      const response = await request(app)
        .put(addressDirectionIdEndpoint)
        .set("Cookie", user1Cookies);

      expect(response.status).toBe(400);
    });

    it("should return 400 if address id is not valid", async () => {
      const response = await request(app)
        .put(invalidAddressDirectionIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);

      expect(response.status).toBe(400);
    });

    it("should return 404 if the object id is not found", async () => {
      const response = await request(app)
        .put(nonexistedAddressDirectionIdEndpoint)
        .set("Cookie", user1Cookies)
        .send(addressDirectionData);

      expect(response.status).toBe(404);
    });
  });
  describe(`DELETE ${addressDirectionEndpoint}/:addressDirectionId`, () => {
    let cookiesForTestDelete = "";
    let addressDirectionIdToDelete = "";
    let addressDirectionIdToDeleteEndpoint = "";
    beforeEach(async () => {
      const { user, cookies } = await loginAndGetCookies();
      cookiesForTestDelete = cookies;
      addressDirectionIdToDelete = user.addressDirections[0]
        ? user.addressDirections[0]._id.toString()
        : "";
      addressDirectionIdToDeleteEndpoint = createEndpoint(
        "users",
        `${user._id}/address-direction/${addressDirectionIdToDelete}`,
      );
    });

    it("should return 204 and delete an address direction for the authenticated user", async () => {
      const response = await request(app)
        .delete(addressDirectionIdToDeleteEndpoint)
        .set("Cookie", cookiesForTestDelete);

      expect(response.status).toBe(204);
    });

    it("should return 403 if user tries to delete address direction of another user", async () => {
      const response = await request(app)
        .delete(addressDirectionIdToDeleteEndpoint)
        .set("Cookie", user2Cookies);

      expect(response.status).toBe(403);
    });

    it("should return 204 and delete an address direction for the admin user", async () => {
      const response = await request(app)
        .delete(addressDirectionIdToDeleteEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(204);
    });

    it("should return 400 if the object id is not valid", async () => {
      const response = await request(app)
        .delete(invalidAddressDirectionIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(400);
    });

    it("should return 404 if the object id is not found", async () => {
      const response = await request(app)
        .delete(nonexistedAddressDirectionIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });
  });
});
