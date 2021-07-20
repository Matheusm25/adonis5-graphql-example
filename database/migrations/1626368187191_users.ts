import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, table => {
      table.integer('account_id').unsigned();
      table.foreign('account_id').references('accounts.id');
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, table => {
      table.dropForeign('account_id');
      table.dropColumn('account_id');
    });
  }
}
