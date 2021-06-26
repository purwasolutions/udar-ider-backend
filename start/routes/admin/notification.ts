import Route from "@ioc:Adonis/Core/Route";

const NotificationRoutes = () => {
  Route.post('/', 'NotificationsController.create');
};
Route.group(NotificationRoutes)
  .prefix('admin/notifications')
  .namespace('App/Controllers/Http/Admin');