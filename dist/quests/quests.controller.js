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
exports.QuestsController = void 0;
const common_1 = require("@nestjs/common");
const quests_service_1 = require("./quests.service");
const create_quest_dto_1 = require("./dto/create-quest.dto");
const update_quest_dto_1 = require("./dto/update-quest.dto");
let QuestsController = class QuestsController {
    constructor(questsService) {
        this.questsService = questsService;
    }
    create(createQuestDto) {
        return this.questsService.create(createQuestDto);
    }
    findAll() {
        return this.questsService.findAll();
    }
    findOne(id) {
        return this.questsService.findOne(+id);
    }
    update(id, updateQuestDto) {
        return this.questsService.update(+id, updateQuestDto);
    }
    remove(id) {
        return this.questsService.remove(+id);
    }
};
exports.QuestsController = QuestsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quest_dto_1.CreateQuestDto]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_quest_dto_1.UpdateQuestDto]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestsController.prototype, "remove", null);
exports.QuestsController = QuestsController = __decorate([
    (0, common_1.Controller)('quests'),
    __metadata("design:paramtypes", [quests_service_1.QuestsService])
], QuestsController);
//# sourceMappingURL=quests.controller.js.map