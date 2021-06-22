import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException';
import Cart from 'App/Models/Cart';
import UnlistedProduct from 'App/Models/UnlistedProduct'
import { EntityResponse } from 'App/Response/EntityResponse';

interface Item {
  _id: number;
  quantity: number;
  location?: string;
  note?: string;
  product: any;
}

interface ListCart {
  _id: number;
  name: string;
  items: Item[];
}

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
      .paginate(1, 100);

    const serialized = data.serialize();

    const listCart: ListCart[] = [];

    await new Promise((resolve) => {
      resolve(serialized.data.map((item) => {
        if (item.product.store) {
          const product = item.product;
          const currentStore = listCart.find((item) => item._id === product.store._id);

          if (currentStore) {
            currentStore.items = [...currentStore.items, {
              _id: item._id,
              quantity: item.quantity,
              note: item.note,
              product
            }];
          } else {
            listCart.push({
              _id: product.store._id,
              name: product.store.name,
              items: [{
                _id: item._id,
                quantity: item.quantity,
                note: item.note,
                product
              }]
            });
          }
        } else {
          const product = item.unlistedProduct;
          const currentStore = listCart.find((item) => item._id === 0);

          if (currentStore) {
            currentStore.items = [...currentStore.items, {
              _id: item._id,
              quantity: item.quantity,
              note: item.note,
              product
            }];
          } else {
            listCart.push({
              _id: 0,
              name: 'Barang Yang Belum Terdaftar',
              items: [{
                _id: item._id,
                quantity: item.quantity,
                location: item.location,
                note: item.note,
                product
              }]
            });
          }
        }
      }));
    });

    const result = {
      meta: serialized.meta,
      data: listCart
    };

    return response.json(result);
  }

  public async update({ user, request, response }: HttpContextContract) {
    const cart = await Cart.query()
      .where('id', request.input('id'))
      .andWhere('user_id', user.id)
      .first();

    if (!cart) {
      throw new EntityNotFoundException('Cart not found');
    }

    cart.quantity = request.input('quantity', cart.quantity);

    await cart.save();

    return response.json(new EntityResponse(cart.serialize()));
  }
}
