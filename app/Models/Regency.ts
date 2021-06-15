import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Province from './Province';

export default class Regency extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number

  @column({ serializeAs: 'provinceId' })
  public provinceId: number;

  @column()
  public name: string;

  @column()
  public code: string

  @belongsTo(() => Province)
  public province: BelongsTo<typeof Province>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
