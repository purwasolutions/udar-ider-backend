import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory';
import Store from './Store';
import ProductImage from './ProductImage';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    columnName: 'product_category_id'
  })
  public categoryId: number;

  @column()
  public storeId: number;

  @column()
  public name: string;

  @column()
  public price: number;

  @belongsTo(() => ProductCategory, {
    foreignKey: 'product_category_id'
  })
  public category: BelongsTo<typeof ProductCategory>

  @belongsTo(() => Store)
  public store: BelongsTo<typeof Store>

  @hasMany(() => ProductImage)
  public images: HasMany<typeof ProductImage>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
