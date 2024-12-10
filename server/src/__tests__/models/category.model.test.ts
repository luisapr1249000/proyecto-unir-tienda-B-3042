import {
  generateCategoryFixture,
  generateCategoryInputFixture,
  getOrCreateCategory,
} from "../../__fixture__/category.fixture";
import { Category } from "../../models/category.model";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";

describe("Category Model Tests", () => {
  beforeAll(async () => {
    await setUpDBForTest();
  });
  afterAll(async () => {
    await disconnectDB();
  });

  it("should Create a category", async () => {
    const categoryInput = await generateCategoryFixture();
    const category = new Category(categoryInput);
    const categorySaved = await category.save();

    expect(categorySaved).toBeDefined();
    expect(categorySaved._id).toBeDefined();

    expect(categorySaved.name).toBe(categoryInput.name);
    expect(categorySaved.description).toBe(categoryInput.description);
  });

  it("should read a user by id", async () => {
    const categoryId = await getOrCreateCategory();
    const fetchedUser = await Category.findById(categoryId);
    expect(fetchedUser).toBeDefined();
  });

  it("should update a category", async () => {
    const categoryId = await getOrCreateCategory();
    const categoryInput = generateCategoryInputFixture();
    await Category.findByIdAndUpdate(categoryId, categoryInput);
    const fetchedUpdatedCategory = await Category.findById(categoryId);
    expect(fetchedUpdatedCategory).toBeDefined();
    expect(fetchedUpdatedCategory?.name).toBe(categoryInput.name);
    expect(fetchedUpdatedCategory?.description).toBe(categoryInput.description);
  });

  it("should delete a category", async () => {
    const categoryId = await getOrCreateCategory();
    await Category.findByIdAndDelete(categoryId);
    const fetchedDeletedCategory = await Category.findById(categoryId);
    expect(fetchedDeletedCategory).toBeNull();
  });
});
