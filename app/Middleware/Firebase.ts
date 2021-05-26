import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException'
import User from 'App/Models/User'
import FirebaseAdmin from 'firebase-admin'

export default class Firebase {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    const idToken = ctx.request.header('Authorization');

    if (idToken) {
      const verifyToken = await FirebaseAdmin.auth().verifyIdToken(idToken)
      
      if (verifyToken) {
        const user = await User.findBy('uid', verifyToken.uid)

        if (!user) {
          throw new EntityNotFoundException('User not found')
        }

        ctx.user = user 
      }
    }
    
    await next()
  }
}
