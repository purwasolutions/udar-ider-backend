import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import FirebaseAdmin from 'firebase-admin';
import Config from '@ioc:Adonis/Core/Config';

export default class AppProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
    const credential = FirebaseAdmin.credential.cert(Config.get('firebase'))
    FirebaseAdmin.initializeApp({
      credential
    })
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
    if (this.app.environment === 'web') {
      await import('../start/socket')
    }
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
