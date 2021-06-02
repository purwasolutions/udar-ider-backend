import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException';
import Role from 'App/Models/Role'
import Store from 'App/Models/Store';
import User from 'App/Models/User'
import Jimp from 'jimp';
import Path from 'path';
import fs from 'fs';
import { string } from '@ioc:Adonis/Core/Helpers';
import { EntityResponse } from 'App/Response/EntityResponse';

export default class UsersController {
  public async register({ request }: HttpContextContract) {
    const role = await Role.firstOrCreate({ name: 'customer' })

    const user = await User.firstOrCreate({ uid: request.input('uid') }, {
      uid: request.input('uid'),
      name: request.input('name'),
      email: request.input('email'),
      roleId: role.id
    })

    return new EntityResponse(user.serialize());
  }

  public async loggedUser({ response, user }: HttpContextContract) {
    const result = await User
      .query()
      .where('id', user.id)
      .preload('role')
      .preload('store')
      .first()
      .then((res) => {
        if (!res) {
          throw new EntityNotFoundException('User not found');
        }
        return res.serialize();
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });

    return response.json(new EntityResponse(result))
  }

  public async currentStore({ response, user }: HttpContextContract) {
    const result = await Store.findBy('user_id', user.id);

    if (!result) {
      return response.json(new EntityResponse(null, false));
    }

    return response.json(new EntityResponse(result.serialize()))
  }

  public async updateStore({ response, request, user }: HttpContextContract) {
    const store = await Store.findBy('user_id', user.id);

    if (!store) return response.status(404).json({ message: 'Store not found ' });

    store.name = request.input('name', store.name);
    store.address = request.input('address', store.address);
    store.villageId = request.input('villageId', store.villageId);
    store.longitude = request.input('longitude', store.longitude);
    store.latitude = request.input('latitude', store.latitude);

    await store.save()
      .catch((err) => {
        throw new Error(err);
      });

    return response.json(new EntityResponse(store.serialize()));
  }

  public async updateStoreImage({ response, request, user }: HttpContextContract) {
    const store = await Store.findBy('user_id', user.id);

    if (!store) return response.status(404).json({ message: 'Store not found' })

    const base64 = request.input('image');

    if (base64) {
      const buffer = Buffer.from(base64, 'base64');
      let dir = Path.join(__dirname, '../../../public/images')
      const filename = string.generateRandom(32) + '.jpeg';

      Jimp.read(buffer, (err, data) => {
        if (!err) data.quality(40).write(`${dir}/${filename}`);
      })

      const oldData = store.image;
      store.image = `images/${filename}`

      await store
        .save()
        .then(() => {
          const file = Path.join(__dirname, '../../../public') + `/${oldData}`;
          fs.access(file, (err) => {
            if (!err) {
              fs.rmSync(file)
            }
          })
        })
        .catch((err) => {
          console.error(err);
        })
    }

    return response.json(new EntityResponse(store.serialize()));
  }
}
