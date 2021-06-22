import Route from '@ioc:Adonis/Core/Route';

const CartRoutes = () => {
  Route.get('/', 'CartsController.list');
  Route.post('/', 'CartsController.addProduct');
  Route.post('/unlisted', 'CartsController.addUnlistedProduct');
  Route.put('/', 'CartsController.update');
  Route.delete('/:id', 'CartsController.remove')
}
Route.group(CartRoutes)
  .middleware('firebase')
  .prefix('carts');