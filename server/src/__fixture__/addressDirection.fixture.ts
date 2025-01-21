import { faker } from "@faker-js/faker";

export const createAddressFixture = () => ({
  pinCode: faker.location.zipCode(),
  locality: faker.location.streetAddress(),
  addressLine1: faker.location.streetAddress(),
  addressLine2: faker.location.secondaryAddress(),
  cityDistrictTown: faker.location.city(),
  state: faker.location.state(),
  mobilePhone: faker.phone.number(),
  addressType: faker.helpers.arrayElement(["home", "work"]),
  landmark: faker.location.streetAddress(),
});
