import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('from_id')
      table.string('to_id')
      table.string('content')

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
