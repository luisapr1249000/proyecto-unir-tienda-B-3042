import {
  generateReviewFixture,
  generateReviewInputFixture,
  getOrCreateReview,
} from "../../__fixture__/review.fixture";
import Review from "../../models/review.model";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";

describe("Review Model Tests", () => {
  beforeAll(async () => {
    await setUpDBForTest();
  });
  afterAll(async () => {
    await disconnectDB();
  });

  it("should create a review", async () => {
    const reviewInput = await generateReviewFixture();
    const review = new Review(reviewInput);
    const reviewSaved = await review.save();
    expect(reviewSaved).toBeDefined();
    expect(reviewSaved._id).toBeDefined();
  });

  it("should read a review by id", async () => {
    const reviewId = await getOrCreateReview();
    const fetchedReview = await Review.findById(reviewId);
    expect(fetchedReview).toBeDefined();
  });

  it("should update a review", async () => {
    const reviewId = await getOrCreateReview();
    const reviewInput = generateReviewInputFixture();
    await Review.findByIdAndUpdate(reviewId, reviewInput);
    const fetchedUpdatedReview = await Review.findById(reviewId);
    expect(fetchedUpdatedReview).toBeDefined();
    expect(fetchedUpdatedReview?.content).toBe(reviewInput.content);
    expect(fetchedUpdatedReview?.review).toBe(reviewInput.review);
  });

  it("should delete a delete", async () => {
    const reviewId = await getOrCreateReview();
    await Review.findByIdAndDelete(reviewId);
    const fetchedDeletedReview = await Review.findById(reviewId);
    expect(fetchedDeletedReview).toBeNull();
  });
});
