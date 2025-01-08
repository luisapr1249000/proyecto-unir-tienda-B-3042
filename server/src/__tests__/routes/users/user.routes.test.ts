import request from "supertest";
import app from "../../../app";
import { disconnectDB, setUpDBForTest } from "../../db/setUpDB";
import { loginAndGetCookies } from "../../helpers/auth.helper";
import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../../constants/constants";
import {
  createEndpoint,
  createQueryEndpoint,
} from "../../helpers/endpoints.helper";
import {
  generateUserFixture,
  getOrCreateUser,
} from "../../../__fixture__/user.fixture";

describe("User Routes", () => {
  let userId = "";
  let userCookies = "";
  let user2Cookies = "";
  let adminCookies = "";
  let userIdEndpoint = "";
  let roleEndpoint = "";
  const userEndpoint = createEndpoint("users");
  beforeAll(async () => {
    try {
      await setUpDBForTest();

      const { user: userAdmin, cookies: adminCookie } =
        await loginAndGetCookies({
          isAdmin: true,
        });
      console.log("USER ADMIN ----> ", userAdmin);
      adminCookies = adminCookie;

      const { user: user1, cookies } = await loginAndGetCookies();
      console.log("USER 1 ----> ", user1);
      const { user: user2, cookies: cookie2 } = await loginAndGetCookies();
      console.log("USER 2 ----> ", user2);

      userId = user1._id.toString();
      userCookies = cookies;
      user2Cookies = cookie2;

      userIdEndpoint = createEndpoint("users", userId);
      roleEndpoint = createEndpoint("users", `${userId}/role`);
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

  describe(`PUT ${userEndpoint}/:userId`, () => {
    it("should return 200 and update a user successfully", async () => {
      const { email, username } = generateUserFixture();
      const updateData = { firstName: "updatedUser", email, username };
      const response = await request(app)
        .put(userIdEndpoint)
        .set("Cookie", userCookies)
        .send(updateData);

      expect(response.status).toBe(200);
    });

    it("should return 200 if admin update any user", async () => {
      const { email, username } = generateUserFixture();
      const updateData = { firstName: "updatedUser", email, username };

      const response = await request(app)
        .put(userIdEndpoint)
        .set("Cookie", adminCookies)
        .send(updateData);

      expect(response.status).toBe(200);
    });

    it("should return 403 if user tries to update other user", async () => {
      const updateData = { firstName: "updatedUser" };

      const response = await request(app)
        .put(userIdEndpoint)
        .set("Cookie", user2Cookies)
        .send(updateData);

      expect(response.status).toBe(403);
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app)
        .put(userIdEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(400);
    });

    it("should return 400 for username taken", async () => {
      const { username } = await getOrCreateUser();
      const updateData = {
        firstName: "updatedUser",
        email: "some@email.com",
        username,
      };

      const response = await request(app)
        .put(userIdEndpoint)
        .set("Cookie", userCookies)
        .send(updateData);

      expect(response.status).toBe(400);
    });

    it("should return 400 for email taken", async () => {
      const { email } = await getOrCreateUser();
      const updateData = {
        firstName: "updatedUser",
        email,
        username: "someUsername",
      };

      const response = await request(app)
        .put(userIdEndpoint)
        .set("Cookie", userCookies)
        .send(updateData);

      expect(response.status).toBe(400);
    });
    it("should return 401 if unauthorized", async () => {
      const response = await request(app)
        .put(userIdEndpoint)
        .send({ username: "newUser" });

      expect(response.status).toBe(401);
    });
  });

  describe(`PUT ${userEndpoint}/:userId/role`, () => {
    it("should return 200 and update a user successfully if the user is an admin", async () => {
      const data = { role: "admin" };
      const response = await request(app)
        .put(roleEndpoint)
        .set("Cookie", adminCookies)
        .send(data);
      // console.log("response ---> ", response);
      expect(response.status).toBe(200);
    });
    it("should return 403 if the user is not an admin", async () => {
      const data = { role: "admin" };
      const response = await request(app)
        .put(roleEndpoint)
        .set("Cookie", user2Cookies)
        .send(data);
      expect(response.status).toBe(403);
    });

    it("should return 404 if the user does not exist", async () => {
      const route = createEndpoint("users", `${NON_EXISTED_OBJECT_ID}/role`);
      const data = { role: "admin" };
      const response = await request(app)
        .put(route)
        .set("Cookie", adminCookies)
        .send(data);
      expect(response.status).toBe(404);
    });

    it("should return 400 if no valid id is provided", async () => {
      const route = createEndpoint("users", `${NON_VALID_OBJECT_ID}/role`);
      const data = { role: "admin" };
      const response = await request(app)
        .put(route)
        .set("Cookie", adminCookies)
        .send(data);
      expect(response.status).toBe(400);
    });

    it("should return 401 if the user is not authenticated", async () => {
      const data = { role: "admin" };
      const response = await request(app).put(roleEndpoint).send(data);
      expect(response.status).toBe(401);
    });

    it("should return 400 if no value is provided", async () => {
      const response = await request(app)
        .put(roleEndpoint)
        .set("Cookie", adminCookies);

      // console.log("no value is provided", response);
      expect(response.status).toBe(400);
    });

    it("should return 400 if the value is not 'admin' or 'user'", async () => {
      const data = { role: "someRandomValue" };
      const response = await request(app)
        .put(roleEndpoint)
        .set("Cookie", adminCookies)
        .send(data);
      // console.log("value is not 'admin' or 'user'", response);

      expect(response.status).toBe(400);
    });
  });

  describe(`DELETE ${userEndpoint}/:userId`, () => {
    let userIdToDelete = "";
    let userCookiesToDelet = "";
    let userDeleteEndpoint = "";
    beforeEach(async () => {
      const { user, cookies } = await loginAndGetCookies();
      userIdToDelete = user._id.toString();
      userCookiesToDelet = cookies;
      userDeleteEndpoint = createEndpoint("users", userIdToDelete);
    });
    it("should return 204 if user deleted successfully as admin", async () => {
      const response = await request(app)
        .delete(userDeleteEndpoint)
        .set("Cookie", adminCookies);
      expect(response.statusCode).toBe(204);
    });
    it("should return 204 if user deleted successfully as the user themselves", async () => {
      const response = await request(app)
        .delete(userDeleteEndpoint)
        .set("Cookie", userCookiesToDelet);
      expect(response.statusCode).toBe(204);
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .delete(createEndpoint("users", NON_VALID_OBJECT_ID))
        .set("Cookie", adminCookies);

      expect(response.status).toBe(400);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app)
        .delete(createEndpoint("users", NON_EXISTED_OBJECT_ID))
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });

    it("should return 403 if a non-admin attempts to delete another user", async () => {
      const response = await request(app)
        .delete(userDeleteEndpoint)
        .set("Cookie", user2Cookies);

      expect(response.status).toBe(403);
    });

    it("should return 401 if no authorization token is provided", async () => {
      const response = await request(app).delete(userDeleteEndpoint);

      expect(response.status).toBe(401);
    });
  });

  describe(`GET ${userEndpoint}/:userId`, () => {
    const userIdEnpoint = createEndpoint("users", userId);
    const userNonValidIdEnpoint = createEndpoint("users", NON_VALID_OBJECT_ID);
    const userNonexistedIdEnpoint = createEndpoint(
      "users",
      NON_EXISTED_OBJECT_ID,
    );

    it("should return 200 and retrieve user successfully by ID", async () => {
      const response = await request(app).get(userIdEnpoint);

      expect(response.status).toBe(200);

      // expect(response.body).not.toHaveProperty("cart");
      // expect(response.body).not.toHaveProperty("savedProducts");
      // expect(response.body).not.toHaveProperty("wishlist");
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app).get(userNonValidIdEnpoint);

      expect(response.status).toBe(400);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app).get(userNonexistedIdEnpoint);

      expect(response.status).toBe(404);
    });
  });

  describe(`GET ${userEndpoint}/:username`, () => {
    it("should return 200 and retrieve user successfully by username", async () => {
      const user = await getOrCreateUser();
      const usernameEndpoint = createEndpoint(
        "users",
        `username/${user.username}`,
      );

      const response = await request(app).get(usernameEndpoint);
      // console.log("response ---> ", response);
      expect(response.status).toBe(200);
    });

    it("should return 404 if user does not exist", async () => {
      const usernameEndpoint = createEndpoint("users", `username/r}`);
      const response = await request(app).get(usernameEndpoint);
      expect(response.status).toBe(404);
    });
  });

  describe(`GET ${userEndpoint} with pagination`, () => {
    it("should return 200 and retrieve paginated list of users", async () => {
      const response = await request(app).get(userEndpoint);
      expect(response.status).toBe(200);
    });

    it("should return 404 if no users found on page", async () => {
      const route = createQueryEndpoint(userEndpoint, "1000");

      const response = await request(app).get(route);
      // console.log("response ---> ", response);
      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid pagination parameters", async () => {
      const response = await request(app).get(
        createQueryEndpoint(userEndpoint, "fwerfwr"),
      );

      expect(response.status).toBe(400);
    });
  });
});
