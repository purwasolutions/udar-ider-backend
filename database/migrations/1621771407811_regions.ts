import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Regions extends BaseSchema {
  protected tableName = 'regions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('province_id').unsigned()

      table.string('name')
      table.string('code').unique()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('province_id', 'id').references('provinces')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
