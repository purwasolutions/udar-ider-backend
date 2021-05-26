import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stores extends BaseSchema {
  protected tableName = 'stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.string('address').nullable()
      table.integer('village_id').unsigned()

      table.string('longitude').nullable()
      table.string('latitude').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('from_id', 'uid').references('users')
      table.foreign('to_id', 'uid').references('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
