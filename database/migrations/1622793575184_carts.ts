import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Carts extends BaseSchema {
  protected tableName = 'carts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('user_id').unsigned();
      table.integer('product_id').unsigned().nullable();
      table.integer('unlisted_product_id').unsigned().nullable();

      table.integer('quantity').defaultTo(1);

      table.text('note').nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.foreign('user_id', 'id').references('users');
      table.foreign('product_id', 'id').references('products');
      table.foreign('unlisted_product_id', 'id').references('unlisted_products');
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
