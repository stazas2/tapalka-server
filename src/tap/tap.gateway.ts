import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TapService } from './tap.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: 'http://paradoxlive.pro', // Разрешаем доступ с вашего клиента
    methods: ['GET', 'POST'],
    credentials: true, // Если требуется авторизация
  },
})
export class TapGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly tapService: TapService,
    private readonly userService: UsersService,

  ) { }

  @WebSocketServer()
  server: Server;

  private pressCounts: Record<string, number> = {};

  afterInit(server: Server) {

    console.log('WebSocket Server Initialized');
  }



  async handleConnection(client: Socket) {
    const idTelegram: string = (client.handshake.query?.userId).toString()
    const username: string = (client.handshake.query?.username).toString()
    const idReferral: string = (client.handshake.query?.idReferral).toString()

    console.log(`Client connected: ${client.id} ${client.handshake.query?.userId} ${client.handshake.query?.username}`);
    let currentUser = await this.userService.findOneByTelegramId(idTelegram)
    if (!currentUser) {
      console.log('User not found. Creating...')
      console.log('Ref: ', idReferral)
      idReferral
        ? currentUser = await this.userService.create({ idTelegram, username }, idReferral)
        : currentUser = await this.userService.create({ idTelegram, username })
    }
    console.log('Updating...')
    /* @ts-ignore */
    await this.tapService.updateUserSocketId(client.handshake.query?.userId, client.id)
    this.pressCounts[client.id] = 0;
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.pressCounts[client.id];
  }

  @SubscribeMessage('init')
  async init(
    @MessageBody() id: [{ message: string, idTelegram: string, username: string }, ''],
    @ConnectedSocket() client: Socket
  ) {
    console.log('init: ', id);
    if (!client || !client.id) {
      // console.log('Button press failed: undefined client: ', client);
      return;
    }

    const { idTelegram } = id[0]

    // const salary = await this.tapService.onUpdate(idTelegram, client.id);
    const user = await this.userService.findOneByTelegramId(idTelegram)

    console.log('Salary!')
    client.emit('initAck', {
      message: 'initAck!',
      // salary,
      user
    });
  }


  @SubscribeMessage('onSalary')
  async salary(
    @MessageBody() id: [{ message: string, idTelegram: string, username: string }, ''],
    @ConnectedSocket() client: Socket
  ) {
    console.log('onSalary: ', id);
    if (!client || !client.id) {
      // console.log('Button press failed: undefined client: ', client);
      return;
    }

    const { idTelegram } = id[0]

    const salary = await this.tapService.onUpdate(idTelegram, client.id);
    const user = await this.userService.findOneByTelegramId(idTelegram)

    console.log('Salary!')

    client.emit('onSalaryAck', { salary, user });

    console.log('Salary added!')

  }


  @SubscribeMessage('buttonPress')
  async handleButtonPress(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ) {
    if (!client || !client.id) {
      // console.log('Button press failed: undefined client: ', client);
      return;
    }

    // console.log('DATA: ', data);
    // console.log('CLIENT: ', client);
    const result = await this.tapService.clickTap(data.id, client.id);
    // console.log('RESP: ', result)

    // this.pressCounts[client.id] = (this.pressCounts[client.id] || 0) + 1;
    // console.log(`Button pressed by ${client.id}. Total presses: ${this.pressCounts[client.id]}`);

    client.emit('buttonPressAck', {
      message: 'Button press acknowledged',
      result,
    });

    // if (this.pressCounts[client.id] > 10) {
    //   this.server.emit('thresholdReached', {
    //     message: `Threshold reached for ${client.id}`,
    //     pressCount: this.pressCounts[client.id],
    //   });
    //   this.pressCounts[client.id] = 0;
    // }
  }


  @SubscribeMessage('clickTap')
  clickTap(@MessageBody() id: string, @ConnectedSocket() client: Socket) {
    console.log(id);
    return this.tapService.clickTap(id, client.id);
  }


}

// import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { TapService } from './tap.service';
// import { CreateTapDto } from './dto/create-tap.dto';
// import { UpdateTapDto } from './dto/update-tap.dto';

// @WebSocketGateway()
// export class TapGateway {
//   constructor(private readonly tapService: TapService) { }

//   @SubscribeMessage('createTap')
//   create(@MessageBody() createTapDto: CreateTapDto) {
//     return this.tapService.create(createTapDto);
//   }



//   @SubscribeMessage('findAllTap')
//   findAll() {
//     return this.tapService.findAll();
//   }

//   @SubscribeMessage('findOneTap')
//   findOne(@MessageBody() id: number) {
//     return this.tapService.findOne(id);
//   }

//   @SubscribeMessage('updateTap')
//   update(@MessageBody() updateTapDto: UpdateTapDto) {
//     return this.tapService.update(updateTapDto.id, updateTapDto);
//   }

//   @SubscribeMessage('removeTap')
//   remove(@MessageBody() id: number) {
//     return this.tapService.remove(id);
//   }
// }
