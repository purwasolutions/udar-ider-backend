import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Message from 'App/Models/Message';
import { EntityResponse } from 'App/Response/EntityResponse';

export default class MessagesController {
  public async getChatId({ response, request }: HttpContextContract) {
    let message = await Message.firstOrCreate({
      uid: request.input('uid'),
      storeId: request.input('storeId')
    });

    return response.json(new EntityResponse(message.serialize()));
  }
}
