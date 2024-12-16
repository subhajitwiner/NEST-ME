import { 
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
import { Subject } from 'rxjs';
 import { Server, WebSocket } from 'ws';

@WebSocketGateway(3001, {
  cors: {
    origin: '*', // or specify the allowed origin
    credentials: true, // if you need to send cookies or authorization headers
  },
})
export class WebsocGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private readonly messageSubject = new Subject<string>();

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: WebSocket) {
    console.log(`Client connected: ${client}`);
    
    // Handle incoming messages using RxJS
    client.on('message', (message: string) => {
      this.messageSubject.next(message);
    });

    // Broadcast messages to all clients
    this.messageSubject.subscribe((msg: string) => {
      this.broadcastMessage(msg);
    });
  }

  handleDisconnect(client: WebSocket) {
    console.log(`Client disconnected: ${client}`);
  }

  private broadcastMessage(message: string) {
    this.server.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
