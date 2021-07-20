import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import pluralize from 'pluralize';

export default function makeCRUDController(model: String) {
  return class MakeCRUDController {
    public async index(
      _: any,
      _args: any,
      { response }: HttpContextContract,
      fields: any,
    ) {
      try {
        const setRelationships = (await import('App/Utils/setRelationship'))
          .default;
        const Model = (await import(`App/Models/${model}`)).default;
        const initialQuery = Model.query();

        const query = setRelationships(initialQuery, fields, [], {}, 'records');
        const entities = await query.paginate();
        return {
          records: entities.toJSON().data,
        };
      } catch (err) {
        console.log(err);
        response.status(err.status || 500).json({ message: err.message });
      }
    }

    public async store(_: any, args: any, { response }: HttpContextContract) {
      try {
        const Model = (await import(`App/Models/${model}`)).default;
        const newEntity = await Model.create(args.input);
        return newEntity.toJSON();
      } catch (err) {
        console.log(err);
        response.status(err.status || 500).json({ message: err.message });
      }
    }

    public async show(_: any, args: any, { response }: HttpContextContract) {
      try {
        const Model = (await import(`App/Models/${model}`)).default;
        const { id } = args;
        const entity = await Model.findOrFail(id);
        return entity.toJSON();
      } catch (err) {
        console.log(err);
        response.status(err.status || 500).json({ message: err.message });
      }
    }

    public async update(_: any, args: any, { response }: HttpContextContract) {
      try {
        const Model = (await import(`App/Models/${model}`)).default;
        const { id } = args.input;
        const entity = await Model.findOrFail(id);
        entity.merge(args.input);
        await entity.save();

        return entity.toJSON();
      } catch (err) {
        console.log(err);
        response.status(err.status || 500).json({ message: err.message });
      }
    }

    public async destroy(_: any, args: any, { response }: HttpContextContract) {
      try {
        const Model = (await import(`App/Models/${model}`)).default;
        const { id } = args;
        const entity = await Model.findOrFail(id);
        await entity.delete();
        return true;
      } catch (err) {
        console.log(err);
        response.status(err.status || 500).json({ message: err.message });
      }
    }

    public addMethods({ queries = {}, mutations = {} } = {}) {
      return {
        Query: {
          [`${pluralize(model)}`]: this.index,
          [`${model}`]: this.show,
          ...queries,
        },
        Mutation: {
          [`${model}Create`]: this.store,
          [`${model}Update`]: this.update,
          [`${model}Delete`]: this.destroy,
          ...mutations,
        },
      };
    }

    public getMethods() {
      return this.addMethods();
    }
  };
}
