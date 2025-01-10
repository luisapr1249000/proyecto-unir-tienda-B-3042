import {
  generateUserDataInputFixture,
  generateUserFixture,
  getOrCreateUser,
} from "../../__fixture__/user.fixture";
import { User } from "../../models/user.model";
import { disconnectDB, setUpDBForTest } from "../db/setUpDB";

describe("User Model Tests", () => {
  beforeAll(async () => {
    await setUpDBForTest();
  });
  afterAll(async () => {
    await disconnectDB();
  });

  it("should Create a User", async () => {
    const userInput = generateUserFixture();
    const user = new User(userInput);
    const userSaved = await user.save();

    expect(userSaved).toBeDefined();
    expect(userSaved._id).toBeDefined();

    expect(userSaved.email).toBe(userInput.email);
    expect(userSaved.role).toBe(undefined);
    expect(userSaved.hasConfirmedEmail).toBe(false);
    expect(userSaved.isSeller).toBe(false);
  });

  it("should read a user by id", async () => {
    const userId = await getOrCreateUser();
    const fetchedUser = await User.findById(userId);
    expect(fetchedUser).toBeDefined();
  });

  it("should update a user", async () => {
    const userId = await getOrCreateUser();
    const userDataInput = generateUserDataInputFixture();
    await User.findByIdAndUpdate(userId, userDataInput);
    const fetchedUpdatedUser = await User.findById(userId);
    expect(fetchedUpdatedUser).toBeDefined();
    expect(fetchedUpdatedUser?.firstName).toBe(userDataInput.firstName);
    expect(fetchedUpdatedUser?.lastName).toBe(userDataInput.lastName);
  });

  it("should delete a user", async () => {
    const userId = await getOrCreateUser();
    await User.findByIdAndDelete(userId);
    const fetchedDeletedUser = await User.findById(userId);
    expect(fetchedDeletedUser).toBeNull();
  });
});
