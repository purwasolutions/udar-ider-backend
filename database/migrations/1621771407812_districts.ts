import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Districts extends BaseSchema {
  protected tableName = 'districts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('regency_id').unsigned()

      table.string('name')
      table.string('code').unique()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('regency_id', 'id').references('regencies')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
