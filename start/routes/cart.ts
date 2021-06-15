import Route from '@ioc:Adonis/Core/Route';

const CartRoutes = () => {
  Route.get('/carts', 'CartsController.list')
  Route.post('/carts', 'CartsController.addProduct')
  Route.post('/carts/unlisted', 'CartsController.addUnlistedProduct')
  Route.delete('/carts/:id', 'CartsController.remove')
}
Route.group(CartRoutes)
  .middleware('firebase')
  .prefix('carts');