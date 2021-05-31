import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import District from 'App/Models/District';

export default class DistrictsController {
  public async findByRegencyId({ response, request }: HttpContextContract) {
    const districts = await District
      .query()
      .where('regency_id', request.param('id'))
      .paginate(1, 1000);
    return response.json(districts);
  }
}
