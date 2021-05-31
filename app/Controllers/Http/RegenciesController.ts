import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Regency from 'App/Models/Regency';

export default class RegenciesController {
  public async findByProvinceId({ response, request }: HttpContextContract) {
    const regencies = await Regency
      .query()
      .where('province_id', request.param('id'))
      .paginate(1, 1000);
    return response.json(regencies);
  }
}
