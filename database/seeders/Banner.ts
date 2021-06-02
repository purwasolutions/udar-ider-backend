import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Banner from 'App/Models/Banner'

export default class BannerSeeder extends BaseSeeder {
  public async run() {
    await Banner.truncate(true);

    await Banner.createMany([
      {
        image: 'images/banner_1.jpg'
      },
      {
        image: 'images/banner_2.jpg'
      }
    ]);
  }
}
