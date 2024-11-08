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
exports.UserCardsController = void 0;
const common_1 = require("@nestjs/common");
const user_cards_service_1 = require("./user-cards.service");
const assign_card_dto_1 = require("./dto/assign-card.dto");
let UserCardsController = class UserCardsController {
    constructor(userCardsService) {
        this.userCardsService = userCardsService;
    }
    assignCardToUser(assignCardDto) {
        console.log('dto', assignCardDto);
        const { userId, cardId } = assignCardDto;
        return this.userCardsService.assignCardToUser(cardId, userId);
    }
    upgradeUserCard(userId, userCardId) {
        return this.userCardsService.upgradeUserCard(userId, userCardId);
    }
    getUserCards(id) {
        return this.userCardsService.getUserCards(id);
    }
    getUserCardsByCategory(id, category) {
        return this.userCardsService.getUserCardsByCategory(id, category);
    }
};
exports.UserCardsController = UserCardsController;
__decorate([
    (0, common_1.Post)('assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_card_dto_1.AssignCardDto]),
    __metadata("design:returntype", void 0)
], UserCardsController.prototype, "assignCardToUser", null);
__decorate([
    (0, common_1.Post)('upgrade/:userId/:userCardId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('userCardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserCardsController.prototype, "upgradeUserCard", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserCardsController.prototype, "getUserCards", null);
__decorate([
    (0, common_1.Get)('category/:id/:category'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UserCardsController.prototype, "getUserCardsByCategory", null);
exports.UserCardsController = UserCardsController = __decorate([
    (0, common_1.Controller)('user-cards'),
    __metadata("design:paramtypes", [user_cards_service_1.UserCardsService])
], UserCardsController);
//# sourceMappingURL=user-cards.controller.js.map