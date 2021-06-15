import Route from '@ioc:Adonis/Core/Route';

const CategoryRoutes = () => {
  Route.post('/', 'CategoriesController.store');
  Route.put('/', 'CategoriesController.update');
}

Route.group(CategoryRoutes)
  .namespace('App/Controllers/Http/Admin')
  .prefix('admin/categories')
  .middleware('authorization')