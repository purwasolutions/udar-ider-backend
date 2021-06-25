import Route from '@ioc:Adonis/Core/Route';

const CartRoutes = () => {
  Route.get('/', 'CartsController.paginate');
  Route.post('/', 'CartsController.create');
  Route.put('/', 'CartsController.update');
  Route.delete('/:id', 'CartsController.delete')
}
Route.group(CartRoutes)
  .middleware('firebase')
  .prefix('carts');