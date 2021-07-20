import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasOne(() => User, {
    foreignKey: 'account_id',
  })
  public profile: HasOne<typeof User>;
}
