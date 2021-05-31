import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Province from 'App/Models/Province';

export default class ProvincesController {
  public async all({ response }: HttpContextContract) {
    const categories = await Province.query().paginate(1, 1000);
    return response.json(categories);
  }
}
