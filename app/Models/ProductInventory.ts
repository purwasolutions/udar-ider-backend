import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Product from './Product';

export default class ProductInventory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({
    serializeAs: 'productId'
  })
  public productId: number;

  @column()
  public prevStock: number;

  @column()
  public currentStock: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;
}
