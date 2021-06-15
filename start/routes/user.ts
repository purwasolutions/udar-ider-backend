import Route from '@ioc:Adonis/Core/Route';

const UserRoutes = () => {
  Route.get('/', 'UsersController.loggedUser')
  Route.get('/store', 'UsersController.currentStore')
  Route.put('/store', 'UsersController.updateStore')
  Route.put('/store/image', 'UsersController.updateStoreImage')
  Route.post('/store/activation', 'UsersController.storeActivation')
}
Route.group(UserRoutes)
  .prefix('user')
  .middleware('firebase');