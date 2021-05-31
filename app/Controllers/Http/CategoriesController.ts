import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';

export default class CategoriesController {
  public async paginate({ response, request }: HttpContextContract) {
    const query = request.qs();
    const page = query.page || 1;
    const perPage = query.length || 10;

    const categories = await Category.query().paginate(page, perPage);

    return response.json(categories);
  }
}
