"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapModule = void 0;
const common_1 = require("@nestjs/common");
const tap_service_1 = require("./tap.service");
const tap_gateway_1 = require("./tap.gateway");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const users_module_1 = require("../users/users.module");
let TapModule = class TapModule {
};
exports.TapModule = TapModule;
exports.TapModule = TapModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.default]), users_module_1.UsersModule],
        providers: [tap_gateway_1.TapGateway, tap_service_1.TapService],
    })
], TapModule);
//# sourceMappingURL=tap.module.js.map