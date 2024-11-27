import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export const ApiBadBaseRequestResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad request',
      schema: {
        example: {
          message: 'message',
          error: {
            message: 'message',
            error: 'error',
            statusCode: 400,
          },
        },
      },
    }),
  );
};
