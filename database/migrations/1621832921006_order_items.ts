import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('order_id').unsigned().nullable()
      table.integer('store_id').unsigned().nullable()

      table.string('name')
      table.integer('quantity').defaultTo(1)
      table.double('price')

      table.text('note').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('order_id', 'id').references('orders')
      table.foreign('store_id', 'id').references('stores')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
