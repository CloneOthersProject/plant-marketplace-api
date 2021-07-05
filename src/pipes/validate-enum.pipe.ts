import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateEnumPipe<E> implements PipeTransform<string> {
  constructor(private EnumToCompare: E, private isOptional = true) {}

  transform(value: string, { data }: ArgumentMetadata) {
    value = value?.toLowerCase();
    const EnumType = this.EnumToCompare;
    const enumValues = Object.values(this.EnumToCompare);

    if (!this.isOptional && !value) {
      throw new BadRequestException(
        `The property ${data} is marked as not optional so you need to provide a value`,
      );
    }

    if (value && !enumValues.includes(value)) {
      throw new BadRequestException(
        `You should provide for the property ${data} at least one of this values, ${enumValues}`,
      );
    }
    return (value || undefined) as unknown as typeof EnumType;
  }
}
