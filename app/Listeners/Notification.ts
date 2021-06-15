import FirebaseAdmin from 'firebase-admin';

interface Customer {
  token: string;
  name: string;
}

interface Store {
  token: string;
  name: string;
}

interface Order {
  customer: Customer;
  store: Store;
}

export default class Notification {
  newOrder(props: Order) {
    FirebaseAdmin.messaging().sendToDevice(props.store.token, {
      notification: {
        title: 'Pesanan Baru',
        body: 'Anda mendapat pesanan baru. Cek sekarang!'
      }
    });

    FirebaseAdmin.messaging().sendToTopic('driver.ready', {
      notification: {
        title: 'Pesanan Baru',
        body: 'Permintaan pesanan baru. Cek sekarang!'
      }
    })
  }

  orderTaked(props: Order) {
    FirebaseAdmin.messaging().sendToDevice(props.customer.token, {
      notification: {
        title: 'Pesanan Diproses',
        body: 'Pesanan sedang di proses oleh Penjual'
      }
    })
  }
}
