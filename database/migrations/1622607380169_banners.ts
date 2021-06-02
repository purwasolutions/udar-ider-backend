import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Banners extends BaseSchema {
  protected tableName = 'banners'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('image')
      table.string('caption').nullable();
      table.string('link').nullable()
      table.boolean('is_active').defaultTo(false);

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
