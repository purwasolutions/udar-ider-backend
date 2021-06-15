import Route from '@ioc:Adonis/Core/Route'

const StoreRoutes = () => {
  Route.post('/activation', 'StoresController.activation')
}

Route.group(StoreRoutes)
  .prefix('store')
  .middleware('firebase');