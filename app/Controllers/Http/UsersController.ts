import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const entities = await User.all();
      return response.status(200).json(entities);
    } catch (err) {
      console.log(err);
      response.status(err.status || 500).json({ message: err.message });
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
