// WebSocketService.js
import { Client } from '@stomp/stompjs';
import Toast from 'react-native-toast-message';
import SockJS from 'sockjs-client';

class WebSocketService {
  client: null | any = null;
  isConnected: boolean = false;

  connect = (token: string, username: string, onMessageReceived: Function) => {
    console.log('token :', token);

    try {
      let sockJS = new SockJS(`http://192.168.1.5:8000/chat?token=${token}`);
      this.client = new Client({
        webSocketFactory: () => sockJS,
        reconnectDelay: 5000,
        debug: str => console.log(str),
        onConnect: frame => {
          this.isConnected = true;
          this.client.subscribe(`/user/topic/private`, msg => {
            onMessageReceived(JSON.parse(msg.body));
          });
        },
        onStompError: frame => {
          console.log('STOMP error:', frame);
        },
      });

      this.client.activate();
    } catch (error) {
      console.log('error in cathc :  error');
    }
  };

  sendMessage = (destination, body) => {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  };
}

const socketService = new WebSocketService();
export default socketService;
