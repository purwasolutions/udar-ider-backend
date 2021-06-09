import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UnlistedProducts extends BaseSchema {
  protected tableName = 'unlisted_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.double('price')
      table.text('note');

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
