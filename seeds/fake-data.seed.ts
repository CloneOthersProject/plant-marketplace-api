import * as faker from 'faker';
import { RecordStatus } from '../src/model/types/status.types';

export const generateRandomPlant = () => ({
  plant_name: faker.lorem.words(2),
  img_url: faker.image.nature(),
  description: faker.lorem.paragraphs(1),
  cuantity: faker.datatype.number(30),
  price: faker.datatype.float(0.01),
  status: faker.helpers.randomize<RecordStatus>([
    RecordStatus.ACTIVE,
    RecordStatus.UNACTIVE,
  ]),
});
