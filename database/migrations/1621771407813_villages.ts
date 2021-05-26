import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Villages extends BaseSchema {
  protected tableName = 'villages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('district_id').unsigned()

      table.string('name')
      table.string('code').unique()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('district_id', 'id').references('districts')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
