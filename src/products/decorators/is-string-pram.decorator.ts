import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const IsStringPram = (pram: string) => {
  return applyDecorators(
    IsString({ message: `'${pram}' must be a string` }),
    IsNotEmpty({ message: `'${pram}' is required` }),
  );
};

export const IsStringOptionalPram = (pram: string) => {
  return applyDecorators(
    IsString({ message: `'${pram}' must be a string` }),
    IsOptional(),
  );
};
