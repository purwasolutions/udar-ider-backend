import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Order from './Order';
import Store from './Store';

export default class OrderItem extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column({ serializeAs: 'orderId' })
  public orderId: number;

  @column({ serializeAs: 'storeId' })
  public storeId: number;

  @column()
  public name: string;

  @column()
  public quantity: number;

  @column()
  public price: number;

  @column()
  public note?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>;

  @belongsTo(() => Store)
  public store: BelongsTo<typeof Store>;
}
