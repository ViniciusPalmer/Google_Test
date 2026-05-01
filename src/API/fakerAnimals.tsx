import { faker } from "@faker-js/faker";

const animalTypes = [
  "bear",
  "bird",
  "cat",
  "cetacean",
  "cow",
  "crocodilia",
  "dog",
  "fish",
  "horse",
  "insect",
  "lion",
  "rabbit",
  "rodent",
  "snake",
] as const;

type AnimalType = (typeof animalTypes)[number];

const getImage = () => faker.image.urlLoremFlickr({ category: "animals", width: 644, height: 362 });
const getType = () => faker.helpers.arrayElement(animalTypes);
const getUrl = () => faker.internet.url();
const getText = () => faker.lorem.sentences();
const getTitle = (type: AnimalType) => faker.animal[type]();

const data = Array.from({ length: 100 }, (_, index) => {
  const type = getType();

  return {
    type,
    id: index + 1,
    url: getUrl(),
    title: getTitle(type),
    description: getText(),
    image: getImage(),
  };
});

export default data;
