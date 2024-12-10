import { faker } from "@faker-js/faker";

export const createImageArray = () => {
  const randomNumber = faker.number.int({ min: 1, max: 5 });
  const images = Array.from({ length: randomNumber }).map(() => ({
    originalName: faker.system.fileName(),
    url: faker.image.url(),
    contentType: "image/jpeg",
    size: faker.number.float({ min: 500, max: 5000 }),
  }));

  return images;
};
