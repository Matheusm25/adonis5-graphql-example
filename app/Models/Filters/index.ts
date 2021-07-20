import SearchFilter from './SearchFilter';
import BetweenFilter from './BetweenFilter';
import InFilter from './InFilter';
import DateEqualFilter from './DateEqualFilter';
import BooleanFilter from './BooleanFilter';
import DefaultFilter from './DefaultFilter';

const FilterOrder = [
  SearchFilter,
  BetweenFilter,
  InFilter,
  DateEqualFilter,
  BooleanFilter,
  DefaultFilter,
];

const setFilter = (query, Model, { field, operation, value, searchEntity }) => {
  let keeptesting = true;
  FilterOrder.map(Filter => {
    const CheckFilter = new Filter({
      Model,
      query,
      field,
      operation,
      value,
      searchEntity,
    });

    if (CheckFilter.check() && keeptesting) {
      query = CheckFilter.apply();
      keeptesting = false;
    }
  });

  return query;
};

export default function applyFilter(
  query,
  Model,
  { field, operation, value, searchEntity },
) {
  const fields = field ? field.split('.') : false;

  if (!fields || fields.length === 1) {
    return setFilter(query, Model, { field, operation, value, searchEntity });
  } else {
    const [entity, ...newfields] = fields;
    return query.whereHas(
      entity,
      builder => {
        return applyFilter(builder, Model, {
          field: newfields.join('.'),
          operation,
          value,
          searchEntity,
        });
      },
      '>',
      0,
    );
  }
}
