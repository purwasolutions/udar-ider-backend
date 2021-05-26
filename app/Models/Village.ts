import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import District from './District';

export default class Village extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public districtId: number;

  @column()
  public name: string;

  @column()
  public code: string;

  @belongsTo(() => District)
  public district: BelongsTo<typeof District>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
