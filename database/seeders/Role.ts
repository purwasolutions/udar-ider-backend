import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    Role.createMany([
      {
        id: 1,
        name: 'customer'
      },
      {
        id: 2,
        name: 'driver'
      },
      {
        id: 3,
        name: 'admin'
      }
    ])
  }
}
