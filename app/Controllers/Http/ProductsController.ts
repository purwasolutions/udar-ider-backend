import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException';
import Product from 'App/Models/Product';
import Category from 'App/Models/Category';
import ProductImage from 'App/Models/ProductImage';
import Store from 'App/Models/Store';
import { string } from '@ioc:Adonis/Core/Helpers';
import path from 'path';
import Jimp from 'jimp';
import { EntityResponse } from 'App/Response/EntityResponse';

export default class ProductsController {
  public async store({ response, request, user }: HttpContextContract) {
    const store = await Store.findBy('user_id', user.id);

    if (!store) {
      throw new EntityNotFoundException('Store not found');
    }

    const category = await Category.findBy('id', request.input('categoryId'));

    if (!category) {
      throw new EntityNotFoundException('Category not found');
    }

    const product = new Product();

    product.name = request.input('name');
    product.price = request.input('price');
    product.categoryId = category.id;
    product.storeId = store.id;

    await product.save();

    const images: string[] = request.input('images');
    images.forEach(async (item: any) => {
      const filename = string.generateRandom(32);
      const dir = path.join(__dirname, '../../../public/images');
      const buffer = Buffer.from(item.base64, 'base64');
      Jimp.read(buffer, (err, res) => {
        if (err) throw new Error(err.message);
        res.quality(50).write(`${dir}/${filename}.jpeg`)
      })

      const image = new ProductImage();
      image.productId = product.id;
      image.path = `images/${filename}.jpeg`;

      await image.save();
    })

    return response.json(new EntityResponse(product.serialize()));
  }

  public async paginate({ response, request, user }: HttpContextContract) {
    const qs = request.qs();

    const isMyProduct = qs.my_product ? String(qs.my_product).toLowerCase() === 'true' || false : false;
    const page = qs.page || 1;
    const perPage = qs.perPage || 10;

    const query = Product
      .query()
      .preload('store')
      .preload('category')
      .preload('images');

    if (isMyProduct) {
      await Store
        .findBy('user_id', user.id)
        .then((res) => {
          if (!res) {
            throw new EntityNotFoundException('Store not found');
          }

          query.where('store_id', res.id);
        });
    }


    const result = await query.paginate(page, perPage);

    return response.json(result);
  }

  public async findById({ response, request }: HttpContextContract) {
    const product = await Product
      .query()
      .where('id', request.param('id'))
      .preload('store')
      .preload('category')
      .preload('images')
      .first()
      .then((res) => {
        if (!res) {
          throw new EntityNotFoundException('Product not found');
        }

        return res;
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });

    return response.json(new EntityResponse(product.serialize()));
  }

  public async update({ response, request }: HttpContextContract) {
    const product = await Product
      .findBy('id', request.param('id'))
      .then((res) => {
        if (!res) {
          throw new EntityNotFoundException('Product not found');
        }

        return res;
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });

    product.name = request.input('name', product.name);
    product.price = request.input('price', product.price);

    const categoryId = request.input('categoryId');
    if (categoryId && categoryId !== product.categoryId) {
      const isAvailable = await Category.findBy('id', categoryId);
      if (isAvailable) {
        product.categoryId = categoryId;
      }
    }

    const result = await product
      .save()
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });

    return response.json(new EntityResponse(result.serialize()));
  }

  public async delete({ response, request, user }: HttpContextContract) {
    const store = await Store
      .findBy('user_id', user.id)
      .then((res) => {
        if (!res) {
          throw new EntityNotFoundException('Store not found');
        }

        return res;
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });

    const result = await Product
      .query()
      .where('store_id', store.id)
      .where('id', request.param('id'))
      .delete()
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });

    return response.json(new EntityResponse(result));
  }
}
