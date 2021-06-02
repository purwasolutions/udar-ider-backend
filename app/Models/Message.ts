import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'fromId' })
  public fromId: number;

  @column({ serializeAs: 'toId' })
  public toId: number;

  @column()
  public content: string

  @belongsTo(() => User)
  public from: BelongsTo<typeof User>

  @belongsTo(() => User)
  public to: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
