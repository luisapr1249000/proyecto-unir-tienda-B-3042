import request from "supertest";
import app from "../../app";
import { setUpDBForTest, disconnectDB } from "../db/setUpDB";
import { loginAndGetCookies } from "../helpers/auth.helper";
import { createEndpoint } from "../helpers/endpoints.helper";
import {
  createUserFixture,
  generateUserFixture,
  getOrCreateUser,
} from "../../__fixture__/user.fixture";

describe("Auth Routes", () => {
  const signupEndpoint = createEndpoint("auth", "signup");
  const loginEndpoint = createEndpoint("auth", "login");
  const refreshTokenEndpoint = createEndpoint("auth", "token/refresh");
  const getAuthUserEndpoint = createEndpoint("auth", "user/me");

  let userCookies: string;
  beforeAll(async () => {
    await setUpDBForTest();
    const { cookies } = await loginAndGetCookies();
    userCookies = cookies;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe.skip(`POST ${signupEndpoint}`, () => {
    it("should return 200 and sign up a new user successfully", async () => {
      const data = generateUserFixture();
      console.log(data);
      const response = await request(app).post(signupEndpoint).send(data);

      // console.log("response -->", response);

      expect(response.status).toBe(201);
    });
    it("should return 400 error if user already exists", async () => {
      const existingUser = await getOrCreateUser();
      const data = {
        username: existingUser.username,
        email: existingUser.email,
        password: "12345678Aa$",
        confirmPassword: "12345678Aa$",
      };
      const response = await request(app).post(signupEndpoint).send(data);

      expect(response.status).toBe(400);
    });

    it('should return 400 error if "confirmPassword" is not the same as "password"', async () => {
      const { confirmPassword, ...rest } = generateUserFixture();
      const data = { ...rest, confirmPassword: "12345678Aa5" };
      const response = await request(app).post(signupEndpoint).send(data);
      expect(response.status).toBe(400);
    });

    it("should return 400 error if weak password", async () => {
      const { password, ...rest } = generateUserFixture();
      const data = { ...rest, password: "12" };
      const response = await request(app).post(signupEndpoint).send(data);
      console.log("response", response);
      expect(response.status).toBe(400);
    });

    it("should return 400 error on validation failure", async () => {
      const response = await request(app)
        .post(signupEndpoint)
        .send({ email: "invalid@email.com" });

      expect(response.status).toBe(400);
    });
  });

  describe(`POST ${loginEndpoint}`, () => {
    it("should return 200 and log in a user successfully using username", async () => {
      const { user, password } = await createUserFixture();
      const data = { loginValue: user.username, password };

      const response = await request(app).post(loginEndpoint).send(data);
      expect(response.status).toBe(200);
    });

    it("should return 200 and log in a user successfully using email", async () => {
      const { user, password } = await createUserFixture();
      const data = { loginValue: user.email, password };

      const response = await request(app).post(loginEndpoint).send(data);
      console.log("response", response);
      expect(response.status).toBe(200);
    });

    it("should return 404 error if user not found", async () => {
      const response = await request(app)
        .post(loginEndpoint)
        .send({ loginValue: "nonexistentUser", password: "wrongPassword" });

      expect(response.status).toBe(404);
    });

    it("should return 400 error if password is incorrect", async () => {
      const { user } = await createUserFixture();
      const response = await request(app)
        .post(loginEndpoint)
        .send({ loginValue: user.username, password: "wrongPassword" });

      expect(response.status).toBe(400);
    });
    it("should return 400 error on validation failure", async () => {
      const response = await request(app)
        .post(loginEndpoint)
        .send({ loginValue: "invalid@email.com" });

      expect(response.status).toBe(400);
    });
  });

  describe.skip(`GET ${refreshTokenEndpoint}`, () => {
    it("should refresh the access token successfully", async () => {
      const response = await request(app)
        .get(refreshTokenEndpoint)
        .set("Cookie", userCookies);

      expect(response.status).toBe(200);
    });

    it("should return unauthorized if no refresh token is provided", async () => {
      const response = await request(app).get(refreshTokenEndpoint);

      expect(response.status).toBe(401);
    });

    it("should return forbidden if refresh token is invalid", async () => {
      const invalidRefreshToken = "invalidRefreshToken";

      const response = await request(app)
        .get(refreshTokenEndpoint)
        .set("Cookie", [`refreshToken=${invalidRefreshToken}`]);

      expect(response.status).toBe(403);
    });
  });
  describe.skip(`GET ${getAuthUserEndpoint}`, () => {
    it("should return the authenticated user data", async () => {
      const response = await request(app)
        .get(getAuthUserEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
    });

    it("should return 401 if user is not authenticated", async () => {
      const response = await request(app).get(getAuthUserEndpoint);

      expect(response.status).toBe(401);
    });
  });
});
