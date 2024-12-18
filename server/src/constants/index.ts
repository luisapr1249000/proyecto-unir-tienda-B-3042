const DEFAULT_COOKIES_DAY = 30 * 24 * 60 * 60 * 1000; // 30 days
const USER_ID = ["userId"];
const PRODUCT_ID = ["productId"];
const REVIEW_ID = ["reviewId"];
const USER_ID_AND_REVIEW_ID = [...USER_ID, ...REVIEW_ID];
const USER_ID_AND_PRODUCT_ID = [...USER_ID, ...PRODUCT_ID];
const PRODUCT_ID_AND_REVIEW_ID = [...PRODUCT_ID, ...REVIEW_ID];

export {
  DEFAULT_COOKIES_DAY,
  USER_ID,
  PRODUCT_ID,
  REVIEW_ID,
  USER_ID_AND_REVIEW_ID,
  USER_ID_AND_PRODUCT_ID,
  PRODUCT_ID_AND_REVIEW_ID,
};
