import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Product from './Product';

export default class Cart extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column({ serializeAs: 'userId' })
  public userId: number;

  @column({ serializeAs: 'productId' })
  public productId?: number;

  @column()
  public quantity: number;

  @column()
  public note?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;
}
