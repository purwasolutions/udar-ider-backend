import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Product from './Product';
import UnlistedProduct from './UnlistedProduct';

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'userId' })
  public userId: number;

  @column({ serializeAs: 'productId' })
  public productId?: number;

  @column({ serializeAs: 'unlistedProductId' })
  public unlistedProductId?: number;

  @column()
  public quantity: number;

  @column()
  public note?: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => UnlistedProduct)
  public unlistedProduct: BelongsTo<typeof UnlistedProduct>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
