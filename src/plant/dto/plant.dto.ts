import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { RecordStatus } from 'src/model/types/status.types';

export class PlantCreateDTO {
  @IsString()
  @IsNotEmpty()
  plantName: string;

  @IsUrl()
  @IsNotEmpty()
  imgUrl: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  cuantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsEnum(RecordStatus)
  @IsOptional()
  status: RecordStatus;
}

export class PlantUpdateDTO extends PartialType(PlantCreateDTO) {}
