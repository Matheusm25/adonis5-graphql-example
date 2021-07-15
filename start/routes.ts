import Route from '@ioc:Adonis/Core/Route';

Route.route('/graphql', ['GET', 'POST'], 'GraphqlController.server');
