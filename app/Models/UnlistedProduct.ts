import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UnlistedProduct extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public note: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
