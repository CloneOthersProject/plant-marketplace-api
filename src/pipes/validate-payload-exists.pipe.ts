import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePayloadExistsPipe implements PipeTransform {
  transform(payload: any) {
    if (!Object.keys(payload).length) {
      throw new BadRequestException(
        'The body of the request should not be empty',
      );
    }

    return payload;
  }
}
