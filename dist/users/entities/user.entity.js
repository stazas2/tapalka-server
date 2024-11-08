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
Object.defineProperty(exports, "__esModule", { value: true });
const team_entity_1 = require("../../teams/entities/team.entity");
const user_card_entity_1 = require("../../user-cards/entities/user-card.entity");
const typeorm_1 = require("typeorm");
const questsDailyList = [
    {
        id: 1,
        isCompleted: false,
        isDaily: false,
        fullCounter: 9,
        currentCounter: 0,
        startDate: null,
        currentDate: null,
    },
];
const questsList = [
    {
        id: 1,
        isCompleted: false,
        salary: 2500,
        title: 'Подписаться на наc в Telegram',
        url: 'https://google.com',
        urlPicture: 'https://google.com',
    },
    {
        id: 2,
        isCompleted: false,
        salary: 5000,
        title: 'Подписаться на наш канал',
        url: 'https://google.com',
        urlPicture: 'https://google.com',
    },
];
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "idTelegram", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Guest' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 100 }),
    __metadata("design:type", Number)
], User.prototype, "energy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "coins", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "0" }),
    __metadata("design:type", String)
], User.prototype, "dateRegistartion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "0" }),
    __metadata("design:type", String)
], User.prototype, "dateSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "0" }),
    __metadata("design:type", String)
], User.prototype, "dateUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "0" }),
    __metadata("design:type", String)
], User.prototype, "dateOnline", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "0" }),
    __metadata("design:type", String)
], User.prototype, "dateOnlineDaily", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isDailyTaken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "dailyCounter", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "0" }),
    __metadata("design:type", String)
], User.prototype, "socketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: [] }),
    __metadata("design:type", Object)
], User.prototype, "referralUsersJSON", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: questsList }),
    __metadata("design:type", Object)
], User.prototype, "questsUsersJSON", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: questsDailyList }),
    __metadata("design:type", Object)
], User.prototype, "questsDailyUsersJSON", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_card_entity_1.UserCard, userCard => userCard.user),
    __metadata("design:type", Array)
], User.prototype, "userCards", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => team_entity_1.Team, team => team.id),
    __metadata("design:type", Array)
], User.prototype, "teams", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
//# sourceMappingURL=user.entity.js.map