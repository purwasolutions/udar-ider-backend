import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductImages extends BaseSchema {
  protected tableName = 'product_images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('product_id').unsigned()
      table.string('path')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('product_id', 'id').references('products')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
