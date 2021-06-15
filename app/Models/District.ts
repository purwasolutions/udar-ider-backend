import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Regency from './Regency';

export default class District extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number

  @column({ serializeAs: 'regencyId' })
  public regencyId: number;

  @column()
  public name: string;

  @column()
  public code: string;

  @belongsTo(() => Regency)
  public regency: BelongsTo<typeof Regency>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
