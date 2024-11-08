"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const database_module_1 = require("./database/database.module");
const cards_module_1 = require("./cards/cards.module");
const quests_module_1 = require("./quests/quests.module");
const teams_module_1 = require("./teams/teams.module");
const user_cards_module_1 = require("./user-cards/user-cards.module");
const schedule_1 = require("@nestjs/schedule");
const cron_module_1 = require("./cron/cron.module");
const tap_module_1 = require("./tap/tap.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const telegram_module_1 = require("./telegram/telegram.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required(),
                    PORT: Joi.number(),
                }),
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            cards_module_1.CardsModule,
            quests_module_1.QuestsModule,
            teams_module_1.TeamsModule,
            user_cards_module_1.UserCardsModule,
            schedule_1.ScheduleModule.forRoot(),
            cron_module_1.CronModule,
            tap_module_1.TapModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client'),
            }),
            auth_module_1.AuthModule,
            telegram_module_1.TelegramModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map