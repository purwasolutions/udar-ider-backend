import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Banner extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: '_id'
  })
  public id: number

  @column()
  public image: string;

  @column()
  public caption?: string;

  @column()
  public link?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt?: DateTime
}
