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

Route
  .group(() => {
    Route.post('/', 'UsersController.register');
    Route.get('/', 'UsersController.loggedUser').middleware('firebase');
    Route.get('/store', 'UsersController.currentStore').middleware('firebase');
    Route.put('/store', 'UsersController.updateStore').middleware('firebase');
    Route.put('/store/image', 'UsersController.updateStoreImage').middleware('firebase');
  })
  .prefix('user');

Route
  .group(() => {
    // Product Categories
    Route.group(() => {
      Route.post('/', 'CategoriesController.store');
    }).prefix('product-categories');

  })
  .prefix('admin')
  .namespace('App/Controllers/Http/Admin');

Route
  .group(() => {
    Route.get('/categories', 'CategoriesController.paginate')

    Route
      .group(() => {
        Route.post('/', 'ProductsController.store');
        Route.get('/', 'ProductsController.paginate');
        Route.get('/:id', 'ProductsController.findById');
        Route.put('/:id', 'ProductsController.update');
        Route.delete('/:id', 'ProductsController.delete');
      })
      .prefix('products');
  })
  .middleware('firebase');