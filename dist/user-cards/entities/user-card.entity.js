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
exports.UserCard = void 0;
const card_entity_1 = require("../../cards/entities/card.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let UserCard = class UserCard {
};
exports.UserCard = UserCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserCard.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, user => user.userCards),
    __metadata("design:type", user_entity_1.default)
], UserCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.Card, card => card.userCards),
    __metadata("design:type", card_entity_1.Card)
], UserCard.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], UserCard.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 5 }),
    __metadata("design:type", Number)
], UserCard.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], UserCard.prototype, "upgradeCost", void 0);
exports.UserCard = UserCard = __decorate([
    (0, typeorm_1.Entity)()
], UserCard);
//# sourceMappingURL=user-card.entity.js.map