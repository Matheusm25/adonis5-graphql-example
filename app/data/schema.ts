import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import makeResourceListTypeDefs from './makeResourceListTypeDefs';
import { getFilesFromDirectory } from 'App/Utils/files';
import path from 'path';

export default async function getSchema() {
  const schemasFiles = getFilesFromDirectory(
    path.join(__dirname, '..', 'schemas'),
  );
  const schemas: any[] = [];

  await Promise.all(
    schemasFiles.map(async (file: String) => {
      const getSchema = (await import(`../schemas/${file}`)).default;
      schemas.push(await getSchema());
    }),
  );

  const typeDefs = mergeTypeDefs([
    ...schemas
      .filter(s => typeof s.typeDefs !== 'undefined')
      .map(s => s.typeDefs),
    makeResourceListTypeDefs([...schemas]),
  ]);

  const resolvers = mergeResolvers([...schemas.map(s => s.resolvers)]);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return schema;
}
