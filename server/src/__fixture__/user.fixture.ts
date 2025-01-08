import { faker } from "@faker-js/faker";

import { User } from "../models/user.model";
import { createAddressFixture } from "./addressDirection.fixture";

const randomNumber = () => String(Math.floor(Math.random() * 1e20));

export const getTotalUsersCount = async () =>
  await User.countDocuments().exec();

export const generateUserFixture = () => ({
  username: randomNumber(),
  email: randomNumber() + faker.internet.email().toLowerCase(),
  password: "12345678Aa$",
  confirmPassword: "12345678Aa$",
});

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

export const createUserFixture = async (isAdmin = false, isSeller = false) => {
  const authInfo = generateUserFixture();
  const user = new User({
    ...authInfo,
    ...generateUserDataInputFixture(),
    lastLogin: faker.date.recent(),
    wishlist: [],
    cart: {},
    isSeller: isSeller,
    role: isAdmin ? "admin" : "user",
    addressDirections: [createAddressFixture()],
  });
  await user.save();
  return { user, password: authInfo.password };
};

export const getOrCreateUser = async ({
  isAdmin = false,
  isSeller = false,
}: {
  isAdmin?: boolean;
  isSeller?: boolean;
} = {}) => {
  const random = faker.number.int({
    min: 0,
    max: await getTotalUsersCount(),
  });

  let user = await User.findOne().skip(random).select("+password");

  if (isAdmin) {
    user = await User.findOne({ role: "admin" }).select("+password");
  }

  if (isSeller) {
    user = await User.findOne({ isSeller: true }).select("+password");
  }

  if (!user) {
    const newUser = await createUserFixture();
    user = newUser.user;
  }
  return user;
};
