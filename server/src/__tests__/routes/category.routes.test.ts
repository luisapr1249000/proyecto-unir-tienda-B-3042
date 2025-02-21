import request from "supertest";
import app from "../../app";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";
import { usersAndCookies } from "../helpers/auth.helper";
// import { loginAndGetCookies } from "../helpers/auth.helper";

import {
  NON_EXISTED_OBJECT_ID,
  NON_VALID_OBJECT_ID,
} from "../constants/constants";
import {
  createCategoryFixture,
  generateCategoryFixture,
  getOrCreateCategory,
} from "../../__fixture__/category.fixture";
import {
  concatEndpoints,
  createEndpoint,
  createQueryEndpoint,
} from "../helpers/endpoints.helper";

describe("Category Routes", () => {
  let userId = "";
  let userCookies = "";
  // let categoryId = "";
  let categoryEndpoint = createEndpoint("categories");
  let categoryIdEndpoint = "";
  let adminCookies = "";

  const categoryNoValidIdEndpoint = createEndpoint(
    "categories",
    NON_VALID_OBJECT_ID,
  );
  const categoryNonexistedIdEndpoint = createEndpoint(
    "categories",
    NON_EXISTED_OBJECT_ID,
  );

  // const categoryQueryEndpoint = (query: string) => {
  //   return createEndpoint("category", `?page=${query}`);
  // };

  beforeAll(async () => {
    await setUpDBForTest();

    const {
      adminUser,
      adminCookies: _adminCookie,
      userCookies: _userCookies,
      user,
    } = await usersAndCookies();
    adminCookies = _adminCookie;
    userCookies = _userCookies;
    userId = user._id.toString();

    const category = await createCategoryFixture(adminUser._id.toString());
    categoryIdEndpoint = concatEndpoints(
      createEndpoint("categories"),
      category._id.toString(),
    );
  });
  afterAll(async () => {
    await disconnectDB();
  });

  describe.skip(`GET ${categoryEndpoint}`, () => {
    it("should retrieve paginated list of categories", async () => {
      const response = await request(app).get(
        createQueryEndpoint(categoryEndpoint, "1"),
      );

      expect(response.status).toBe(200);
    });

    it("should return 404 if no categories found on page", async () => {
      const response = await request(app).get(
        createQueryEndpoint(categoryEndpoint, "1000"),
      );

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid pagination parameters", async () => {
      const response = await request(app).get(
        createQueryEndpoint(categoryEndpoint, "wrfwerfwer"),
      );

      expect(response.status).toBe(400);
    });
  });

  describe.skip(`GET ${categoryEndpoint}/:id`, () => {
    it("should return 200 and retrieve category by id", async () => {
      const response = await request(app).get(categoryIdEndpoint);
      expect(response.status).toBe(200);
    });
    it("should return 404 if category does not exist", async () => {
      const response = await request(app).get(categoryNonexistedIdEndpoint);
      expect(response.status).toBe(404);
    });
    it("should return 400 for invalid categoryId", async () => {
      const response = await request(app).get(categoryNoValidIdEndpoint);
      expect(response.status).toBe(400);
    });
  });

  describe.skip(`GET ${categoryEndpoint}/name/:name`, () => {
    let categoryNameEndpoint: string;
    let categoryNonexistedNameEndpoint = createEndpoint(
      "category",
      "name/noexistedcategory",
    );
    beforeAll(async () => {
      const { name } = await getOrCreateCategory();
      categoryNameEndpoint = createEndpoint("categories", `name/${name}`);
    });
    it("should return 200 and retrieve category by name", async () => {
      const response = await request(app).get(categoryNameEndpoint);
      // console.log(response);
      expect(response.status).toBe(200);
    });

    it("should return 404 if category does not exist", async () => {
      const response = await request(app).get(categoryNonexistedNameEndpoint);
      expect(response.status).toBe(404);
    });
  });
  describe.skip(`POST ${categoryEndpoint}`, () => {
    it("should return 200 and create a new category", async () => {
      const newCategory = generateCategoryFixture();

      const response = await request(app)
        .post(categoryEndpoint)
        .set("Cookie", adminCookies)
        .send(newCategory);

      expect(response.status).toBe(201);
    });

    it("should return 400 error if the category input is invalid", async () => {
      const invalidCategory = { invalidField: "Invalid Data" };

      const response = await request(app)
        .post(categoryEndpoint)
        .set("Cookie", adminCookies)
        .send(invalidCategory);

      expect(response.status).toBe(400);
    });

    it("should return 401 if auth token is missing", async () => {
      const newCategory = { name: "New Category" };

      const response = await request(app)
        .post(categoryEndpoint)
        .send(newCategory);

      expect(response.status).toBe(401);
    });

    it("should return 400 if the category name is already taken", async () => {
      const category = await createCategoryFixture();
      const newCategory = {
        name: category.name,
        description: "new description",
      };

      const response = await request(app)
        .post(categoryEndpoint)
        .set("Cookie", adminCookies)
        .send(newCategory);

      console.log("response", response);
      expect(response.status).toBe(400);
    });
    it("should return 403 if the user is not an admin", async () => {
      const newCategory = { name: "New Category" };

      const response = await request(app)
        .post(categoryEndpoint)
        .set("Cookie", userCookies)
        .send(newCategory);

      expect(response.status).toBe(403);
    });
  });

  describe.skip(`PUT ${categoryEndpoint}/:categoryId`, () => {
    const updatedData = generateCategoryFixture();
    it("should  return 200 and update an existing category", async () => {
      const newData = generateCategoryFixture();

      const response = await request(app)
        .put(categoryIdEndpoint)
        .set("Cookie", adminCookies)
        .send(newData);

      expect(response.status).toBe(200);
    });

    it("should return 400 if the category name is already taken", async () => {
      const category = await getOrCreateCategory();
      const updatedData = { name: category.name };

      const response = await request(app)
        .put(categoryIdEndpoint)
        .set("Cookie", adminCookies)
        .send(updatedData);

      expect(response.status).toBe(400);
    });

    it("should return 404 if the category does not exist", async () => {
      const response = await request(app)
        .put(categoryNonexistedIdEndpoint)
        .set("Cookie", adminCookies)
        .send(updatedData);

      expect(response.status).toBe(404);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .put(categoryNoValidIdEndpoint)
        .set("Cookie", adminCookies)
        .send(updatedData);

      expect(response.status).toBe(400);
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app)
        .put(categoryIdEndpoint)
        .send(updatedData);

      expect(response.status).toBe(401);
    });

    it("should return 403 if the user is not an admin", async () => {
      const updatedData = { name: "Updated by Admin Category Name" };

      const response = await request(app)
        .put(categoryIdEndpoint)
        .set("Cookie", userCookies)
        .send(updatedData);
      expect(response.status).toBe(403);
    });
  });

  describe(`DELETE ${categoryEndpoint}/:categoryId`, () => {
    let categoryIdToDelete = "";
    let deleteCategoryEndpoint = "";
    beforeEach(async () => {
      const { _id } = await createCategoryFixture(userId);
      categoryIdToDelete = _id.toString();
      deleteCategoryEndpoint = createEndpoint("categories", categoryIdToDelete);
    });

    it("should return 204 if user is admin", async () => {
      const response = await request(app)
        .delete(deleteCategoryEndpoint)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(204);
    });

    it("should return 401 if not cookies", async () => {
      const response = await request(app).delete(deleteCategoryEndpoint);

      expect(response.status).toBe(401);
    });

    it("should return 401 if not user admin", async () => {
      const response = await request(app)
        .delete(deleteCategoryEndpoint)
        .set("Cookie", userCookies);
      expect(response.status).toBe(403);
    });

    it("should return 404 if the category does not exist", async () => {
      const response = await request(app)
        .delete(categoryNonexistedIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(404);
    });

    it("should return 400 if not valid id", async () => {
      const response = await request(app)
        .put(categoryNoValidIdEndpoint)
        .set("Cookie", adminCookies);

      expect(response.status).toBe(400);
    });
  });
});
