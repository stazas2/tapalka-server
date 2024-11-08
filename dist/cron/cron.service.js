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
var CronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
let CronService = CronService_1 = class CronService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(CronService_1.name);
    }
    async handleCron() {
        const users = await this.userRepository.find();
        const updatedUsers = users.map(user => ({ ...user, energy: 100 }));
        await this.userRepository.save(updatedUsers);
        this.logger.debug('UPDATED ENERGY!');
    }
    async handleCronCalculateUsersRating() {
        let users = await this.userRepository.find();
        users.sort((userPrevious, userNext) => userPrevious.salary - userNext.salary);
        const usersRating = users.map((user, idx) => ({ ...user, rating: idx + 1 }));
        const updatedUsers = usersRating.map(user => ({ ...user, energy: 100 }));
        await this.userRepository.save(updatedUsers);
        this.logger.debug('UPDATED RATING!');
    }
    async handleCronUpdateIsDailyTaken() {
        let users = await this.userRepository.find();
        const usersUpdated = users.map((user, idx) => ({ ...user, isDailyTaken: false }));
        await this.userRepository.save(usersUpdated);
        this.logger.debug('UPDATED RATING!');
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_3_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleCron", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_3_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleCronCalculateUsersRating", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleCronUpdateIsDailyTaken", null);
exports.CronService = CronService = CronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CronService);
//# sourceMappingURL=cron.service.js.map