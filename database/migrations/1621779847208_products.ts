import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('store_id').unsigned()
      table.integer('product_category_id').unsigned()

      table.string('name')
      table.double('price')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('store_id', 'id').references('stores')
      table.foreign('product_category_id', 'id').references('product_categories')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
