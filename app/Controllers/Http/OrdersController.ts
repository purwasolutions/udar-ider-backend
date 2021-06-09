import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'

export default class OrdersController {
  public async listOrders({ response, user }: HttpContextContract) {
    const orders = await Order
      .query()
      .where('store_id', user.store.id)
      .where('status', 0)
      .orderBy('created_at', 'asc')
      .paginate(1, 1000);

    return response.json(orders);
  }

  public async listItems({ response, request, user }: HttpContextContract) {
    const items = await OrderItem
      .query()
      .preload('store', (query) => {
        query.where('id', user.store.id)
      })
      .preload('order', (query) => {
        query.where('id', request.param('order_id'))
      })
      .paginate(1, 1000);

    return response.json(items);
  }
}
