import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart';
import UnlistedProduct from 'App/Models/UnlistedProduct'
import { EntityResponse } from 'App/Response/EntityResponse';

export default class CartsController {
  public async addUnlistedProduct({ response, request, user }: HttpContextContract) {
    const product = await UnlistedProduct.create({
      name: request.input('name'),
      price: request.input('price'),
      note: request.input('note'),
    });

    const cart = await Cart.create({
      userId: user.id,
      unlistedProductId: product.id,
      quantity: request.input('quantity'),
      note: product.note
    });

    return response.json(new EntityResponse(cart));
  }

  public async addProduct({ response, request, user }: HttpContextContract) {
    const cart = await Cart.create({
      userId: user.id,
      productId: request.input('productId'),
      quantity: request.input('quantity'),
      note: request.input('note'),
    })

    return response.json(new EntityResponse(cart));
  }

  public async remove({ response, request, user }: HttpContextContract) {
    const cart = await Cart
      .query()
      .where('user_id', user.id)
      .andWhere('id', request.param('id'))
      .delete()

    if (cart) {
      return response.json(new EntityResponse(null, true, 'Cart has been deleted'))
    }

    return response.json(new EntityResponse(null, false, 'Failed to delete cart'));
  }

  public async list({ response, user }: HttpContextContract) {
    const data = await Cart
      .query()
      .where('user_id', user.id)
      .preload('product', (query) => {
        query
          .preload('category')
          .preload('images')
          .preload('store');
      })
      .preload('unlistedProduct')
      .paginate(1, 1000);

    return response.json(data);
  }
}
