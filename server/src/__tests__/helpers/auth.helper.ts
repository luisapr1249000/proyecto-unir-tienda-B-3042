import request from "supertest";
import app from "../../app";
import { createEndpoint } from "./endpoints.helper";
import { createUserFixture } from "../../__fixture__/user.fixture";

export const loginAndGetCookies = async ({
  isAdmin = false,
  isSeller = false,
}: {
  isAdmin?: boolean;
  isSeller?: boolean;
} = {}) => {
  const endpoint = createEndpoint("auth", "login");
  const { user, password } = await createUserFixture(isAdmin, isSeller);

  const response = await request(app)
    .post(endpoint)
    .send({ loginValue: user.username, password: password });

  const cookies = response.headers["set-cookie"] ?? "no cookies";
  return { user, cookies };
};
