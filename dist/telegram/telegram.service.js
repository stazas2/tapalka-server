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
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const users_service_1 = require("../users/users.service");
let TelegramService = class TelegramService {
    constructor(userService) {
        this.userService = userService;
        this.bot = new TelegramBot('7513402778:AAFEKvnyBtiyvQZVjaU70zGCcpiVor_nrx0', { polling: true });
        this.bot.onText(/\/start/, async (msg) => {
            const chatId = (msg.chat.id).toString();
            console.log(chatId);
            const userExist = await userService.findOneByTelegramId(chatId);
            console.log(userExist);
            if (userExist) {
                this.sendStartMessage(chatId, 'Вы вернулись!');
            }
            else {
                this.sendStartMessage(chatId, `Добро пожаловать в Paradox!

Ты стал партнером нашего маркетингового агентства и теперь можешь строить собственный бизнес прямо здесь! Исследуй мир блогеров, собирай монеты, развивай пассивный доход и создавай стратегию, которая приведет тебя к успеху.

Совсем скоро мы объявим дату листинга токена, где твой прогресс будет оценен.

Не забывай приглашать друзей — вместе вы сможете зарабатывать еще больше!

Начни свой путь в Paradox уже сейчас!`);
            }
        });
        this.bot.on('message', async (msg) => {
            if (msg.web_app_data) {
                const webAppData = msg.web_app_data.data;
                const referralId = webAppData.referral_id;
                if (referralId) {
                    this.bot.sendMessage(msg.chat.id, `Вы пришли по реферальной ссылке с ID ${referralId}`);
                }
                else {
                    this.bot.sendMessage(msg.chat.id, 'Запуск Web App без реферальной ссылки');
                }
            }
        });
    }
    sendStartMessage(chatId, msg = '') {
        console.log('ID!: ', chatId);
        const webAppUrl = `https://paradoxlive.pro`;
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open Web App',
                            web_app: { url: webAppUrl },
                        },
                    ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        };
        console.log('id: ', chatId);
        !msg
            ? this.bot.sendMessage(chatId, msg, options)
            : this.bot.sendMessage(chatId, msg, options);
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map