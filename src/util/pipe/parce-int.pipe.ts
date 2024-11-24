import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): number | undefined {
    if (!value) {
      return undefined;
    }
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new BadRequestException(`${metadata.data} must be a number`);
    }
    return parsedValue;
  }
}
