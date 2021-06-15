import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stores extends BaseSchema {
  protected tableName = 'stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('village_id').unsigned().nullable()
      table.integer('user_id').unsigned()

      table.string('name')
      table.string('address').nullable()
      table.string('image')

      table.string('longitude').nullable()
      table.string('latitude').nullable()

      table.boolean('isOpen').defaultTo(true);

      table.timestamp('opened_at', { useTz: true })
      table.timestamp('closed_at', { useTz: true })
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('village_id', 'id').references('villages')
      table.foreign('user_id', 'id').references('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
