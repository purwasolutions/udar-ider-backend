import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Order extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column({ serializeAs: 'userId' })
  public userId: number;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt?: DateTime;

  /**
   * Relations
   */

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
