import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Region from './Region';

export default class District extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public region_id: number;

  @column()
  public name: string;

  @column()
  public code: string;

  @belongsTo(() => Region)
  public region: BelongsTo<typeof Region>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
