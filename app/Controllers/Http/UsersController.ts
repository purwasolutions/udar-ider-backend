import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request }: HttpContextContract) {
    let role;
    if (request.input('role') === 'store') {
      role = await Role.firstOrCreate({ name: 'store' })
    } else {
      role = await Role.firstOrCreate({ name: 'customer' })
    }
     
    const user = new User()

    user.uid = request.input('uid')
    user.name = request.input('name')
    user.email = request.input('email')
    user.roleId = role.id

    await user.save()

    return user.serialize();
  }

  public async loggedUser({ response, user }: HttpContextContract) {
    return response.json(user)
  }
}
