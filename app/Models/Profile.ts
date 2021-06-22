import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Profile extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column({
    serializeAs: 'userId'
  })
  public userId: number;

  @column()
  public name: string;

  @column()
  public phone?: string;

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
}
