import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Village from './Village';

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public villageId: number;

  @column()
  public name: string;

  @column()
  public address?: string;

  @column()
  public longitude?: string;

  @column()
  public latitude?: string;

  @belongsTo(() => Village)
  public village: BelongsTo<typeof Village>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
