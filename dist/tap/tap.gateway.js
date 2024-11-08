"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const tap_service_1 = require("./tap.service");
const users_service_1 = require("../users/users.service");
let TapGateway = class TapGateway {
    constructor(tapService, userService) {
        this.tapService = tapService;
        this.userService = userService;
        this.pressCounts = {};
    }
    afterInit(server) {
        console.log('WebSocket Server Initialized');
    }
    async handleConnection(client) {
        const idTelegram = (client.handshake.query?.userId).toString();
        const username = (client.handshake.query?.username).toString();
        const idReferral = (client.handshake.query?.idReferral).toString();
        console.log(`Client connected: ${client.id} ${client.handshake.query?.userId} ${client.handshake.query?.username}`);
        let currentUser = await this.userService.findOneByTelegramId(idTelegram);
        if (!currentUser) {
            console.log('User not found. Creating...');
            console.log('Ref: ', idReferral);
            idReferral
                ? currentUser = await this.userService.create({ idTelegram, username }, idReferral)
                : currentUser = await this.userService.create({ idTelegram, username });
        }
        console.log('Updating...');
        await this.tapService.updateUserSocketId(client.handshake.query?.userId, client.id);
        this.pressCounts[client.id] = 0;
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        delete this.pressCounts[client.id];
    }
    async init(id, client) {
        console.log('init: ', id);
        if (!client || !client.id) {
            return;
        }
        const { idTelegram } = id[0];
        const user = await this.userService.findOneByTelegramId(idTelegram);
        console.log('Salary!');
        client.emit('initAck', {
            message: 'initAck!',
            user
        });
    }
    async salary(id, client) {
        console.log('onSalary: ', id);
        if (!client || !client.id) {
            return;
        }
        const { idTelegram } = id[0];
        const salary = await this.tapService.onUpdate(idTelegram, client.id);
        const user = await this.userService.findOneByTelegramId(idTelegram);
        console.log('Salary!');
        client.emit('onSalaryAck', { salary, user });
        console.log('Salary added!');
    }
    async handleButtonPress(data, client) {
        if (!client || !client.id) {
            return;
        }
        const result = await this.tapService.clickTap(data.id, client.id);
        client.emit('buttonPressAck', {
            message: 'Button press acknowledged',
            result,
        });
    }
    clickTap(id, client) {
        console.log(id);
        return this.tapService.clickTap(id, client.id);
    }
};
exports.TapGateway = TapGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TapGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('init'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TapGateway.prototype, "init", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onSalary'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TapGateway.prototype, "salary", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('buttonPress'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TapGateway.prototype, "handleButtonPress", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('clickTap'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], TapGateway.prototype, "clickTap", null);
exports.TapGateway = TapGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: 'http://paradoxlive.pro',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [tap_service_1.TapService,
        users_service_1.UsersService])
], TapGateway);
//# sourceMappingURL=tap.gateway.js.map