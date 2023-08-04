import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  path: '/api/events',
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  constructor(private readonly eventService: EventService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test')
  test(@MessageBody() _) {
    return this.eventService.test();
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
