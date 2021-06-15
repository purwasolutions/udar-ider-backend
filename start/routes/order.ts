import Route from '@ioc:Adonis/Core/Route'

const OrderRoutes = () => {
  Route.get('/', 'OrdersController.listOrders');
  Route.get('/:id/items', 'OrdersController.listItems');
}

Route.group(OrderRoutes)
  .middleware('firebase')
  .prefix('orders')
