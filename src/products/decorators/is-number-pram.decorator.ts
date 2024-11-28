import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export const IsNumberPram = (pramTitle: string) => {
  return applyDecorators(
    IsNumber({}, { message: `'${pramTitle}' must be a number` }),
    IsNotEmpty({ message: `'${pramTitle}' is required` }),
  );
};

export const IsNumberOptionalPram = (pramTitle: string) => {
  return applyDecorators(
    IsNumber({}, { message: `'${pramTitle}' must be a number` }),
    IsOptional(),
  );
};
