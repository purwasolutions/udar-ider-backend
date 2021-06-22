import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Product from './Product';

export default class ProductImage extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column({ serializeAs: 'productId' })
  public productId: number;

  @column()
  public path: string;

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
