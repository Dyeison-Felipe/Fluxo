import {
  SchemaObject,
  ReferenceObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const paginatedSchemaDocs: Record<
  string,
  SchemaObject | ReferenceObject
> = {
  meta: {
    type: 'object',
    properties: {
      totalItems: {
        type: 'number',
      },
      itemCount: {
        type: 'number',
      },
      itemsPerPage: {
        type: 'number',
      },
      totalPages: {
        type: 'number',
      },
      currentPage: {
        type: 'number',
      },
    },
  },
};

export const findAllSchemaDocs: Record<string, SchemaObject | ReferenceObject> =
  {
    meta: {
      type: 'object',
      properties: {
        totalItems: {
          type: 'number',
        },
      },
    },
  };

export const getItemsSchemaDocs = (
  items: SchemaObject | ReferenceObject,
): Record<string, SchemaObject | ReferenceObject> => {
  return {
    items: {
      type: 'array',
      items,
    },
  };
};