import Report from "../models/report.model";
import { faker } from "@faker-js/faker";
import { getOrCreateProduct } from "./product.fixture";
import { getOrCreateReview } from "./review.fixture";
import { getOrCreateUser } from "./user.fixture";
import { getOrCreateCategory } from "./category.fixture";

export const getTotalReportCount = async () => await Report.countDocuments();

export const generateReportResolution = () => ({
  resolution: faker.lorem.sentence(),
  resolved: true,
});

export const generateReportDataFixture = ({
  itemType,
}: {
  itemType?: string;
}) => {
  const item = itemType
    ? [itemType]
    : faker.helpers.arrayElement(["Product", "Review", "User", "Category"]);
  const data = {
    reason: faker.helpers.arrayElement([
      "Spam",
      "Inappropriate Content",
      "Misleading Information",
      "Other",
    ]),
    problemDescription: faker.lorem.sentence(),
    itemType: item,
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
  const randomItemType = ["User", "Category", "Product", "Review"];
  const item = itemType ? itemType : faker.helpers.arrayElement(randomItemType);
  const data = generateReportDataFixture({ itemType: item });

  let reportedItemId = "";
  switch (item) {
    case "Product":
      reportedItemId = (await getOrCreateProduct())._id.toString();
      break;
    case "Review":
      reportedItemId = (await getOrCreateReview())._id.toString();
      break;
    case "User":
      reportedItemId = (await getOrCreateUser())._id.toString();
      break;
    case "Category":
      reportedItemId = (await getOrCreateCategory())._id.toString();
      break;
    default:
      reportedItemId = (await getOrCreateProduct())._id.toString();
      break;
  }

  const report = new Report({
    ...data,
    itemType: item,
    reportedItem: reportedItem ?? reportedItemId,
    reporter: reporter ?? (await getOrCreateUser())._id.toString(),
  });

  await report.save();
  return report;
};

export const getOrCreateReport = async () => {
  const random = faker.number.int({
    min: 0,
    max: await getTotalReportCount(),
  });

  let report = await Report.findOne().skip(random);
  if (!report) {
    report = await createReportFixture();
  }

  return report;
};
