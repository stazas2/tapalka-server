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
exports.Card = void 0;
const user_card_entity_1 = require("../../user-cards/entities/user-card.entity");
const typeorm_1 = require("typeorm");
let Card = class Card {
};
exports.Card = Card;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Card.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Title' }),
    __metadata("design:type", String)
], Card.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "descriptionShort", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Description' }),
    __metadata("design:type", String)
], Card.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Card.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Card.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Card.prototype, "rph", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Card.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'http://google.com/' }),
    __metadata("design:type", String)
], Card.prototype, "urlPicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'youtube' }),
    __metadata("design:type", String)
], Card.prototype, "urlPictureSocial", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'http://google.com/' }),
    __metadata("design:type", String)
], Card.prototype, "urlUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Title' }),
    __metadata("design:type", String)
], Card.prototype, "urlUserTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Card.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '1' }),
    __metadata("design:type", String)
], Card.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Card.prototype, "upgradeCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'bloggers' }),
    __metadata("design:type", String)
], Card.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_card_entity_1.UserCard, userCard => userCard.card),
    __metadata("design:type", Array)
], Card.prototype, "userCards", void 0);
exports.Card = Card = __decorate([
    (0, typeorm_1.Entity)()
], Card);
//# sourceMappingURL=card.entity.js.map