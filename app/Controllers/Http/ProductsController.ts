import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException';
import Product from 'App/Models/Product';

export default class ProductsController {
  public async paginate({ response, request }: HttpContextContract) {
    const query = request.qs();
    const page = query.page || 1;
    const perPage = query.perPage || 10;

    const products = await Product.query().paginate(page, perPage);
    
    return response.json(products);
  }

  public async findById({ response, request }: HttpContextContract) {
    const product = await Product.findBy('id', request.param('id'));

    if (!product) {
      throw new EntityNotFoundException('Product not found');
    }

    return response.json(product.serialize());
  }
}
