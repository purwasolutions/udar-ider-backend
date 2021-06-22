import Route from '@ioc:Adonis/Core/Route';

const RoleRoutes = () => {
  Route.get('/', 'RolesController.paginate');
};
Route.group(RoleRoutes)
  .prefix('roles');