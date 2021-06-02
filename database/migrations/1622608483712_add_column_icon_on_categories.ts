import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddColumnIconOnCategories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('icon');
    })
  }

  public async down() {
    // this.schema.dropTable(this.tableName)
  }
}
