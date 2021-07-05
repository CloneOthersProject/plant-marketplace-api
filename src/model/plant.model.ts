import BaseModel from './base.model';

import { Tables } from 'src/database';

export class PlantModel extends BaseModel {
  static tableName = Tables.PLANT;

  id: string;
  plantName: string;
  imgUrl: string;
  description: string;
  price: number;
  cuantity: number;
}
