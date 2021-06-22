import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, computed, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Role from './Role';
import Store from './Store';
import Profile from './Profile';

export default class User extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column()
  public uid: string;

  @column({ serializeAs: 'roleId' })
  public roleId: number;

  @column({ serializeAs: 'socketId' })
  public socketId?: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Tempolaries
   */
  @computed()
  public hasCart?: boolean;

  /**
   * Relations
   */

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>;

  @hasOne(() => Store)
  public store: HasOne<typeof Store>;

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>;
}
