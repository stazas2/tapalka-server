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
exports.TapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let TapService = class TapService {
    constructor(userRepository, userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }
    create(createTapDto) {
        return 'This action adds a new tap';
    }
    async updateUserSocketId(idTelegram, socketId) {
        console.log('1: ', idTelegram, socketId);
        const user = await this.userRepository.findOneBy({ idTelegram });
        if (user) {
            console.log('2: ', idTelegram, socketId);
            return await this.userRepository.save({ ...user, socketId });
        }
        console.log('3: ', idTelegram, socketId);
    }
    async clickTap(idTelegram, socketId) {
        console.log('clickTap', idTelegram, socketId);
        const user = await this.userRepository.findOne({ where: { idTelegram, socketId }, });
        if (!user) {
            return;
        }
        console.log(user.coins);
        const coins = user.coins + 1;
        if (user.energy <= 0) {
            throw new common_1.BadRequestException('Not enough!');
        }
        const energy = user.energy - 1;
        console.log(user.coins);
        return await this.userRepository.save({ ...user, coins, energy });
    }
    async onUpdate(idTelegram, socketId) {
        return await this.userService.updateOnline(idTelegram);
    }
    findAll() {
        return `This action returns all tap`;
    }
    findOne(id) {
        return `This action returns a #${id} tap`;
    }
    update(id, updateTapDto) {
        return `This action updates a #${id} tap`;
    }
    remove(id) {
        return `This action removes a #${id} tap`;
    }
};
exports.TapService = TapService;
exports.TapService = TapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], TapService);
//# sourceMappingURL=tap.service.js.map