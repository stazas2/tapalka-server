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
exports.UserCardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_card_entity_1 = require("./entities/user-card.entity");
const user_entity_1 = require("../users/entities/user.entity");
const card_entity_1 = require("../cards/entities/card.entity");
const users_service_1 = require("../users/users.service");
let UserCardsService = class UserCardsService {
    constructor(userService, userCardRepository, userRepository, cardRepository) {
        this.userService = userService;
        this.userCardRepository = userCardRepository;
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
    }
    async getUserCards(_id) {
        const user = await this.userRepository.findOneBy({ _id });
        const userCards = await this.userCardRepository.find({ where: { user }, relations: ['card'] });
        return userCards;
    }
    async getUserCardsByCategory(_id, category) {
        console.log('by category', category, _id);
        const userCards = await this.userCardRepository.find({ where: { user: { _id } }, relations: ['card'] });
        console.log('userCards: ', userCards);
        const userCardsUpdated = userCards.map((card, idx) => ({ ...card, salary: userCards[idx].salary, level: userCards[idx].level, upgradeCost: userCards[idx].upgradeCost }));
        const userCardsFiltered = userCardsUpdated.filter(card => card.card.category === category);
        console.log('userCards filtered: ', userCardsFiltered);
        return userCardsFiltered;
    }
    async assignCardToUser(cardId, userId) {
        console.log('userId: ', userId);
        const user = await this.userRepository.findOne({ where: { _id: userId } });
        console.log('current User: ', user);
        const card = await this.cardRepository.findOne({ where: { _id: cardId } });
        console.log('CARD: ', card);
        const cardExist = await this.userCardRepository.findOneBy({ user: { _id: userId }, card: { _id: cardId } });
        console.log('CardExist: ', cardExist);
        if (cardExist) {
            throw new common_1.BadRequestException('Exist');
        }
        if (user.coins >= card.price) {
            user.coins -= card.price;
            const userCard = new user_card_entity_1.UserCard();
            userCard.user = user;
            userCard.card = card;
            userCard.salary = card.salary;
            userCard.upgradeCost = card.price * 2;
            console.log('updatedUser: ', user);
            await this.userRepository.save(user);
            console.log('updatedUserCard: ', userCard);
            await this.userCardRepository.save(userCard);
            const userUpdated = await this.userService.recalculateSalary(user._id);
            return userUpdated;
        }
        else {
            throw new common_1.BadRequestException('Not enough!');
        }
    }
    async upgradeUserCard(userId, userCardId) {
        console.log('USERID', userId, userCardId);
        const user = await this.userRepository.findOne({ where: { _id: userId }, relations: ['userCards'] });
        const card = await this.cardRepository.findOne({ where: { _id: userCardId } });
        const userCard = await this.userCardRepository.findOne({ where: { user: { _id: user._id }, card: { _id: card._id } }, relations: ['card'] });
        console.log('USER', user);
        console.log('USERCARD', userCard);
        if (!userCard || !user) {
            throw new common_1.NotFoundException('UserCard or User not found');
        }
        if (user.coins < userCard.upgradeCost) {
            throw new common_1.BadRequestException('Insufficient coins to upgrade the card');
        }
        console.log('UserCoinsBefore: ', user.coins);
        console.log('UserCardUpgrade: ', userCard.upgradeCost);
        user.coins -= userCard.upgradeCost;
        console.log('UserCoinsAfter: ', user.coins);
        user.salary -= userCard.salary;
        userCard.level += 1;
        userCard.salary += userCard.salary;
        userCard.upgradeCost += userCard.upgradeCost;
        user.salary += userCard.salary;
        console.log('USERCARD5', userCard);
        await this.userRepository.save(user);
        await this.userCardRepository.save(userCard);
        return { user, userCard };
    }
};
exports.UserCardsService = UserCardsService;
exports.UserCardsService = UserCardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_card_entity_1.UserCard)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __param(3, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserCardsService);
//# sourceMappingURL=user-cards.service.js.map