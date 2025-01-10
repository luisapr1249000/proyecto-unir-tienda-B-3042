import Report from "../models/report.model";
import { faker } from "@faker-js/faker";
import { getOrCreateProduct } from "./product.fixture";
import { getOrCreateReview } from "./review.fixture";
import { getOrCreateUser } from "./user.fixture";

export const getTotalReportCount = async () => await Report.countDocuments();

export const generateReportDataFixture = () => {
  const data = {
    reason: faker.helpers.arrayElement([
      "Spam",
      "Inappropriate Content",
      "Misleading Information",
      "Other",
    ]),
    problemDescription: faker.lorem.sentence(),
    itemType: faker.helpers.arrayElement(["Product", "Review"]),
  };
  return data;
};

interface ReportFixture {
  itemType?: string;
  reportedItem?: string;
  reporter?: string;
}
export const createReportFixture = async ({
  itemType,
  reportedItem,
  reporter,
}: ReportFixture = {}) => {
  const data = generateReportDataFixture();
  let reportedItem_ = {};
  if (itemType === "Product") {
    reportedItem_ = (await getOrCreateProduct())._id.toString();
  } else {
    reportedItem_ = (await getOrCreateReview())._id.toString();
  }
  const report = new Report({
    ...data,
    itemType: itemType ?? data.itemType,
    reportedItem: reportedItem ?? reportedItem_,
    reporter: reporter ?? (await getOrCreateUser())._id.toString(),
  });

  await report.save();
  return report;
};

export const getOrCreateReport = async ({ reporter }: ReportFixture = {}) => {
  const random = faker.number.int({
    min: 0,
    max: await getTotalReportCount(),
  });

  let report = await Report.findOne().skip(random);
  if (!report) {
    report = await createReportFixture({
      reporter,
    });
  }

  return report;
};
