import Route from "@ioc:Adonis/Core/Route";

const MessageRoutes = () => {
  Route.post('/get-id', 'MessagesController.getChatId');
};
Route.group(MessageRoutes)
  .prefix('messages')
  .middleware('firebase');