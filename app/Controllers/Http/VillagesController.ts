import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Village from 'App/Models/Village';
import { EntityResponse } from 'App/Response/EntityResponse';

export default class VillagesController {
  public async findByDistrictId({ response, request }: HttpContextContract) {
    const categories = await Village
      .query()
      .where('district_id', request.param('id'))
      .paginate(1, 1000);
    return response.json(categories);
  }

  public async findById({ response, request }: HttpContextContract) {
    console.log(request.param('id'));
    const village = await Village
      .query()
      .preload('district', (district) => {
        district.preload('regency', (regency) => {
          regency.preload('province');
        })
      })
      .where('id', request.param('id'))
      .first();

    if (!village) return response.status(404).json({ message: 'Village not found ' });

    return response.json(new EntityResponse(village.serialize()))
  }
}
