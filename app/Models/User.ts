import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Account from 'App/Models/Account';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public account_id: number;

  @belongsTo(() => Account, {
    foreignKey: 'account_id',
  })
  public account: BelongsTo<typeof Account>;
}
