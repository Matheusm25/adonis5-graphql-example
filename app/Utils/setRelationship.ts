import graphqlFields from 'graphql-fields';
import applyFilter from 'App/Models/Filters';

const exceptions = [
  'variables',
  'conditions',
  'flowCreditData',
  'reportCategories',
];

function fieldsSerialization(fields) {
  for (let value in fields) {
    if (Object.values(fields[value]).length === 0) {
      delete fields[value];
    } else {
      fields[value] = fieldsSerialization(fields[value]);
    }
  }

  return fields;
}

function setRelationships(query, fields, filters = [], orderBy = {}) {
  Object.keys(fields).map(field => {
    if (!exceptions.includes(field) && Object.values(fields[field]).length) {
      query.preload(field, subquery => {
        if (orderBy.by && orderBy.by.split('.')[0].includes(field)) {
          subquery = subquery.orderBy(orderBy.by, orderBy.order || 'ASC');
        }

        return setRelationships(
          subquery,
          fields[field],
          filters
            .filter(filter => filter.field)
            .filter(
              filter =>
                filter.field.split('.')[0].includes(field) &&
                filter.field.split('.').length === 3,
            )
            .map(filter => ({
              ...filter,
              field: filter.field.split(`${field}.`)[1],
            })),
          orderBy.by && orderBy.by.split('.')[0].includes(field)
            ? { order: orderBy.order, by: orderBy.by.split(`${field}.`)[1] }
            : {},
        );
      });
    } else if (!exceptions.includes(field)) {
      query.preload(field, subquery => {
        if (filters.length) {
          filters
            .filter(filter => filter.field)
            .filter(filter => filter.field.split('.')[0].includes(field))
            .forEach(filter => {
              const filterField = filter.field.split('.')[1];
              subquery = applyFilter(
                subquery,
                {},
                {
                  filterField,
                  operation: filter.operation || '=',
                  value: filter.value,
                  searchEntity: filter.searchEntity,
                },
              );
            });
        }

        if (orderBy.by && orderBy.by.split('.')[0].includes(field)) {
          subquery = subquery.orderBy(orderBy.by, orderBy.order || 'ASC');
        }
      });
    }
  });

  return query;
}

export default function execute(
  query,
  fields,
  filters = [],
  orderBy = {},
  startsWith,
) {
  let newFields = graphqlFields(fields);
  newFields = fieldsSerialization(
    startsWith ? newFields[startsWith] : newFields,
  );
  return setRelationships(query, newFields, filters, orderBy);
}
