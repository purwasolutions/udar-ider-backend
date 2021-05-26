import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException';
import Product from 'App/Models/Product'
import ProductCategory from 'App/Models/ProductCategory';
import Store from 'App/Models/Store';

export default class ProductsController {
  public async store({ response, request, user }: HttpContextContract) {
    const store = await Store.findBy('user_id', user.id);

    if (!store) {
      throw new EntityNotFoundException('Store not found');
    }

    const category = await ProductCategory.findBy('id', request.input('categoryId'));

    if (!category) {
      throw new EntityNotFoundException('Category not found');
    }

    const product = new Product();

    product.name = request.input('name');
    product.price = request.input('price');
    product.categoryId = category.id;
    product.storeId = store.id;

    await product.save();

    return response.json(product.serialize());
  }

  public async paginate({ response, request, user }: HttpContextContract) {
    const store = await Store.findBy('user_id', user.id);

    if (!store) {
      throw new EntityNotFoundException('Store not found');
    }

    const page = request.qs().page || 1;
    const perPage = request.qs().length || 2;

    const products = await Product.query().paginate(page, perPage);

    return response.json(products);
  }

  public async findById({ response, request, user }: HttpContextContract) {
    const store = await Store.findBy('user_id', user.id);

    if (!store) {
      throw new EntityNotFoundException('Store not found');
    }

    const product = await Product
      .query()
      .leftJoin('product_categories', 'id', 'products.product_category_id')
      .where('id', request.param('id'))
      .andWhere('store_id', store.id)
      .first();

    if (!product) {
      throw new EntityNotFoundException('Product not found');
    }

    return response.json(product.serializeRelations());
  }
}
