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

export const usersAndCookies = async () => {
  const { user: user1, cookies } = await loginAndGetCookies({ isSeller: true });
  const { user: user2, cookies: cookie2 } = await loginAndGetCookies();
  const { user: adminUser, cookies: adminCookie } = await loginAndGetCookies({
    isAdmin: true,
  });

  return {
    userSeller: user1,
    sellerCookies: cookies,
    user: user2,
    userCookies: cookie2,
    adminUser: adminUser,
    adminCookies: adminCookie,
  };
};
