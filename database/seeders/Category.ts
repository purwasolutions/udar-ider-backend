import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    await Category.truncate(true);

    await Category.createMany([
      {
        name: 'Makanan',
        icon: 'icons/makanan.png'
      },
      {
        name: 'Minuman',
        icon: 'icons/minuman.png'
      },
      {
        name: 'Pakaian',
        icon: 'icons/pakaian.png'
      },
      {
        name: 'Lainnya',
        icon: 'icons/lainnya.png'
      }
    ])
  }
}
