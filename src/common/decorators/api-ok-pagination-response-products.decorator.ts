import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export const ApiPaginatedResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        example: {
          items: [{ title: 'title', price: 99, id: 'id' }],
          pagination: {
            totalItems: 1,
            pageItems: 1,
            currentPage: 1,
            perPage: 1,
          },
        },
      },
    }),
  );
};
