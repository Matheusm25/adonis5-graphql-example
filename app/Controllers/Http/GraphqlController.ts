import { runHttpQuery } from 'apollo-server-core';
import getSchema from 'App/data/schema';

export default class GraphqlController {
  public async server(ctx) {
    const schema = await getSchema();
    const { request, response, auth } = ctx;
    var method = request.method();
    var query = method === 'POST' ? request.post() : request.get();
    return runHttpQuery([ctx], {
      method: method,
      header: request.headers(),
      options: {
        schema,
        context: { auth, request, response, ctx },
      },
      query: query.query
        ? query
        : Object.keys(request.body).map(key => request.body[key]),
    }).then(
      function (gqlResponse) {
        response.type('application/json');
        response.json(JSON.parse(gqlResponse.graphqlResponse));
      },
      function (error) {
        if ('HttpQueryError' !== error.name) {
          throw error;
        }
        if (error.headers) {
          Object.keys(error.headers).forEach(function (header) {
            response.header(header, error.headers[header]);
          });
        }
        response.status(error.statusCode).send(error.message);
      },
    );
  }
}
