import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Firebase from 'firebase-admin';

export default class NotificationsController {
  public async create({ request, response }: HttpContextContract) {
    Firebase
      .firestore()
      .collection('notifications')
      .add({
        title: request.input('title'),
        content: request.input('content'),
        createdAt: Date.now(),
        active: true
      });

    return response.json({
      success: true
    });
  }
}
