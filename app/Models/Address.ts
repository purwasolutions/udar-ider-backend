import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Village from './Village';

export default class Address extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number;

  @column({
    serializeAs: 'villageId'
  })
  public villageId: number;

  @column()
  public name: string;

  @column()
  public address: string;

  @column()
  public longitude?: string;

  @column()
  public latitude?: string;

  @column()
  public isPrimary: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */

  @belongsTo(() => Village)
  public village: BelongsTo<typeof Village>;
}
