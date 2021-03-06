import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Address from './Address';

export default class Store extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column({ serializeAs: 'userId' })
  public userId: number;

  @column({ serializeAs: 'addressId' })
  public addressId: number;

  @column()
  public name: string;

  @column()
  public avatar?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>;
}
