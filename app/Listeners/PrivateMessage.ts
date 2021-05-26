import Message from 'App/Models/Message';
import User from 'App/Models/User';

interface OnInitializeProps {
  uid: string;
  socketId: string;
}

interface SendMessageProps {
  from: string;
  to: string;
  content: string;
}

export default class PrivateMessage {
  public async onInitialize(props: OnInitializeProps) {
    const { uid, socketId } = props;
    const user = await User.findBy('uid', uid);

    if (user) {
      user.socketId = socketId;
      await user.save();
    } 
  }

  public async sendMessage(props: SendMessageProps) {
    const user = await User.findBy('socket_id', props.from);

    if (user) {
      const message = new Message()
      message.fromId = user.id;
      message.toId = user.id;
      message.content = props.content;
      await message.save();
    }
  }
}
