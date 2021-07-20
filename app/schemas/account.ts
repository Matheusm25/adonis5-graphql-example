import makeResolver from 'App/data/makeResolver';

export default async function getSchema() {
  const AccountSchema = {
    model: 'Account',
    typeDefs: `
      type Account {
        id: ID
        name: String
      }
  
      input AccountCreateInput {
        name: String
      }
  
      input AccountUpdateInput {
        id: ID
        name: String
      }
  
      type Query {
        Accounts(pagination: PaginationInput, filters: [FilterInput], order: OrderInput, withTrashed: Boolean): AccountResource
        Account(id: ID, uuid: String, withTrashed: Boolean): Account
      }
  
      type Mutation {
        AccountCreate(input: AccountCreateInput): Account
        AccountUpdate(input: AccountUpdateInput): Account
        AccountDelete(id: ID, uuid: String): Boolean
      }
    `,
    resolvers: await makeResolver({ model: 'Account' }),
  };

  return AccountSchema;
}
