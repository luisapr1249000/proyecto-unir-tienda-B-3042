import {
  createProduct,
  createProductInput,
  getOrCreateProduct,
} from "../../__fixture__/product.fixture";
import { Product } from "../../models/product.model";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";

describe("User Model Tests", () => {
  beforeAll(async () => {
    await setUpDBForTest();
  });
  afterAll(async () => {
    await disconnectDB();
  });

  it("should create a product", async () => {
    const productInput = createProduct();
    const product = new Product(productInput);
    const productSaved = await product.save();

    expect(productSaved).toBeDefined();
    expect(productSaved._id).toBeDefined();
    expect(productSaved.quantity).toBeGreaterThanOrEqual(1);
    expect(productSaved.price).toBeGreaterThanOrEqual(1);
    expect(productSaved.finalPrice).toBeGreaterThanOrEqual(1);
  });

  it("should read a product by id", async () => {
    const productId = await getOrCreateProduct();
    const fetchedProduct = await Product.findById(productId);
    expect(fetchedProduct).toBeDefined();
    expect(fetchedProduct?._id.toString()).toBe(productId);
  });

  it("should update a product", async () => {
    const productInput = await createProductInput();
    const productId = await getOrCreateProduct();
    await Product.findByIdAndUpdate(productId, productInput);
    const fetchedUpdatedProduct = await Product.findById(productId);
    expect(fetchedUpdatedProduct).toBeDefined();
  });

  it("should delete a product", async () => {
    const productId = await getOrCreateProduct();
    await Product.findByIdAndDelete(productId);
    const fetchedUpdatedProduct = await Product.findById(productId);
    expect(fetchedUpdatedProduct).toBeNull();
  });
});
