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

Route
  .group(() => {
    Route.post('/', 'UsersController.register');
    Route.get('/', 'UsersController.loggedUser').middleware('firebase');
  })
  .prefix('user');


Route
  .group(() => {
    // Product Categories
    Route.group(() => {
      Route.post('/', 'ProductCategoriesController.store');
    }).prefix('product-categories');

  })
  .prefix('admin')
  .namespace('App/Controllers/Http/Admin');

Route
  .group(() => {
    Route
      .group(() => {
        Route
          .post('/', 'ProductsController.store');
      })
        .prefix('products');
  
  })
    .prefix('store')
    .namespace('App/Controllers/Http/Store');

Route
  .group(() => {
    Route.get('/product-categories', 'ProductCategoriesController.paginate')
    
    Route.get('/products', 'ProductsController.paginate')
    Route.get('/products/:id', 'ProductsController.findById')
  })