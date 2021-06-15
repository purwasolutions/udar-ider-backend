import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { rootdir } from 'Config/app';
import Jimp from 'jimp';

export default class CategoriesController {
  public async store({ request }: HttpContextContract) {
    const category = new Category();

    category.name = request.input('name');
    category.icon = request.input('image');

    const buffer = Buffer.from(category.icon, 'base64');
    Jimp.read(buffer, (_, value) => {
      const directory = rootdir + '/public/icons'
      value.write(directory + `${category.name}.png`);
      category.icon = `icons/${category.name}.png`;
    });

    await category.save();

    return category;
  }
}
