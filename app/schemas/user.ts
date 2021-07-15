import makeResolver from 'App/data/makeResolver';

export default async function getSchema() {
  const UserSchema = {
    model: 'User',
    typeDefs: `
      type User {
        id: ID
        name: String
        email: String
      }
  
      input UserCreateInput {
        name: String
        email: String!
      }
  
      input UserUpdateInput {
        id: ID
        name: String
        email: String
      }
  
      type Query {
        Users(pagination: PaginationInput, filters: [FilterInput], order: OrderInput, withTrashed: Boolean): UserResource
        User(id: ID, uuid: String, withTrashed: Boolean): User
      }
  
      type Mutation {
        UserCreate(input: UserCreateInput): User
        UserUpdate(input: UserUpdateInput): User
        UserDelete(id: ID, uuid: String): Boolean
      }
    `,
    resolvers: await makeResolver({ model: 'User' }),
  };

  return UserSchema;
}
