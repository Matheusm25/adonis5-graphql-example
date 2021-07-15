import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id');
      table.string('name');
      table.string('email');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
