import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory';

export default class ProductCategoriesController {
  public async paginate({ response, request }: HttpContextContract) {
    const query = request.qs();
    const page = query.page || 1;
    const perPage = query.length || 10;

    const categories = await ProductCategory.query().paginate(page, perPage);
    
    return response.json(categories);
  }
}
