import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Role from 'App/Models/Role';

export default class RolesController {
  public async paginate({ response }: HttpContextContract) {
    const roles = await Role.query().paginate(1, 1000);

    return response.json(roles);
  }
}
