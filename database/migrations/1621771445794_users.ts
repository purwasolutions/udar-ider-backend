import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('role_id')
      table.string('socket_id').unique().nullable()

      table.string('uid').unique()
      table.string('name')
      table.string('email').unique()
      table.string('phone').unique().nullable()
      table.string('image').nullable()

      table.string('latitude').nullable()
      table.string('longitude').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('role_id').references('roles')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
