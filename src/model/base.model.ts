import { AnyQueryBuilder, Model, Modifiers } from 'objection';
import { Tables } from 'src/database';
import { RecordStatus, StatusDTO } from './types/status.types';

export const col = (table: Tables, columnName: string) =>
  `${table}.${columnName}`;

class BaseModel extends Model {
  createdAt: string;
  updatedAt: string;
  status: RecordStatus;

  static get modifiers(): Modifiers<AnyQueryBuilder> {
    return {
      status: (builder, status = StatusDTO.ACTIVE) => {
        builder.where('status', status);
      },
    };
  }

  static get modelPaths(): string[] {
    return [__dirname];
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export default BaseModel;
