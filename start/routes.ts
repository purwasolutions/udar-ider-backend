/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/provinces', 'ProvincesController.all');
Route.get('/provinces/:id/regencies', 'RegenciesController.findByProvinceId');
Route.get('/regencies/:id/districts', 'DistrictsController.findByRegencyId');
Route.get('/districts/:id/villages', 'VillagesController.findByDistrictId');
Route.get('/villages/:id', 'VillagesController.findById');

Route.get('/banners', 'BannersController.activedBanners');
Route.post('/user', 'UsersController.register');

/**
 * UserRoutes
 */
const UserRoutes = () => {
  Route.get('/', 'UsersController.loggedUser')
  Route.get('/store', 'UsersController.currentStore')
  Route.put('/store', 'UsersController.updateStore')
  Route.put('/store/image', 'UsersController.updateStoreImage')
}
Route.group(UserRoutes)
  .prefix('user')
  .middleware('firebase');

/**
 * Category Routes
 */
const CategoryRoutes = () => {
  Route.get('/', 'CategoriesController.paginate');
}
Route.group(CategoryRoutes)
  .middleware('firebase')
  .prefix('categories');

/**
 * Product Routes
 */
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

/**
 * Cart Routes
 */
const CartRoutes = () => {
  Route.get('/carts', 'CartsController.list')
  Route.post('/carts', 'CartsController.addProduct')
  Route.post('/carts/unlisted', 'CartsController.addUnlistedProduct')
  Route.delete('/carts/:id', 'CartsController.remove')
}
Route.group(CartRoutes)
  .middleware('firebase')
  .prefix('carts');

/**
 * Order Routes
 */
const OrderRoutes = () => {
  Route.get('/', 'OrdersController.listOrders');
  Route.get('/:id/items', 'OrdersController.listItems');
}
Route.group(OrderRoutes)
  .middleware('firebase')
  .prefix('orders')
