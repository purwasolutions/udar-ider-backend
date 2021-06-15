import Route from '@ioc:Adonis/Core/Route';

const CategoryRoutes = () => {
  Route.get('/', 'CategoriesController.paginate');
}
Route.group(CategoryRoutes)
  .middleware('firebase')
  .prefix('categories');