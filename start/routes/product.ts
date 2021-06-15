import Route from '@ioc:Adonis/Core/Route';

const ProductRoutes = () => {
  Route.post('/', 'ProductsController.store');
  Route.get('/', 'ProductsController.paginate');
  Route.get('/:id', 'ProductsController.findById');
  Route.put('/:id', 'ProductsController.update');
  Route.delete('/:id', 'ProductsController.delete');
}
Route.group(ProductRoutes)
  .middleware('firebase')
  .prefix('products')