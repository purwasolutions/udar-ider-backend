import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Store from './Store'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column({ serializeAs: 'roleId' })
  public roleId: number;

  @column({ serializeAs: 'socketId' })
  public socketId?: string;

  @column()
  public name: string

  @column()
  public email: string

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasOne(() => Store)
  public store: HasOne<typeof Store>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
