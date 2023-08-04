import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { Server, Socket } from 'socket.io';
import { CreateEventDto } from './dto/create-event.dto';

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

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      //qiita.com/ayudai/items/54c8de8b5d1232f45405
      https: console.log('connected!');
    });
  }

  @SubscribeMessage('test')
  create(@MessageBody() _: CreateEventDto) {
    return this.eventService.test();
  }

  afterInit(server: Server) {
    //初期化
    console.log(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    //クライアント接続時
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    //クライアント切断時
    console.log(`Client disconnected: ${client.id}`);
  }
}
