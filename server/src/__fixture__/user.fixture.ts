import { faker } from "@faker-js/faker";

import { User } from "../models/user.model";
import { createAddressFixture } from "./addressDirection.fixture";

export const getTotalUsersCount = async () =>
  await User.countDocuments().exec();

export const generateUserFixture = () => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email().toLowerCase(),
    password: "12345678",
  };
};

export const generateUserDataInputFixture = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bio: faker.lorem.sentence(),
    avatar: {
      originalName: faker.system.commonFileName(),
      url: faker.image.avatar(),
      contentType: "image/png",
      size: faker.helpers.rangeToNumber({ min: 10000, max: 500000 }).toString(),
    },
    phoneNumber: "1234567890",
  };
};

export const createUserFixture = async (isAdmin = false) => {
  const authInfo = generateUserFixture();
  const user = new User({
    ...authInfo,
    ...generateUserDataInputFixture(),
    lastLogin: faker.date.recent(),
    savedProducts: [],
    wishlist: [],
    cart: [],
    isSeller: faker.datatype.boolean(),
    role: isAdmin ? "admin" : faker.helpers.arrayElement(["user", "admin"]),
    addressDirections: createAddressFixture(),
  });
  await user.save();
  return { user, password: authInfo.password };
};

export const getOrCreateUser = async () => {
  const random = faker.number.int({
    min: 0,
    max: await getTotalUsersCount(),
  });

  let user = await User.findOne().skip(random).exec();
  if (!user) {
    const newUser = await createUserFixture();
    user = newUser.user;
  }
  return user._id.toString();
};
