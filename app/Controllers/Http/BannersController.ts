import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Banner from 'App/Models/Banner'

export default class BannersController {
  public async activedBanners({ response }: HttpContextContract) {
    const banners = await Banner
      .query()
      .paginate(1, 5)

    return response.json(banners)
  }
}
