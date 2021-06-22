import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Store from './Store';

export default class StoreSchedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: 'storeId' })
  public storeId: number;

  @column()
  public day: string;

  @column()
  public open: string;

  @column()
  public close: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */

  @belongsTo(() => Store)
  public store: BelongsTo<typeof Store>;
}
