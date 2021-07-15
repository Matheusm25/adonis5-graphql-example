export default function makeResourceListTypeDefs(schemas) {
  let typeDefs = `
    type Pagination {
      perPage: Int!
      page: Int!
      total: Int!
      lastPage: Int!
    }

    input PaginationInput {
      page: Int
      perPage: Int
    }

    input FilterInput {
      field: String
      operation: String
      searchEntity: String
      value: [String]
    }

    type FilterOutput {
      field: String
      operation: String
      value: [String]
    }

    enum OrderType {
      ASC
      DESC
    }

    input OrderInput {
      by: String
      order: OrderType
      intern: Boolean
    }
  `;

  schemas
    .filter(s => typeof s.typeDefs !== 'undefined')
    .filter(s => typeof s.model !== 'undefined')
    .map(s => {
      typeDefs += `
      type ${s.model}Resource {
        pagination: Pagination!
        records: [${s.model}]!
      }

      type ${s.model}Return {
        isNew: Boolean
        entity: ${s.model}
      }

    `;
    });

  return typeDefs;
}
