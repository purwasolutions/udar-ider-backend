import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'

export default class ProductCategoriesController {
  public async store ({ request }: HttpContextContract) {
    const category = new ProductCategory();

    category.name = request.input('name');

    await category.save();

    return category;
  }
}
