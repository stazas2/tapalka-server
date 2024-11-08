"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserCardDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_card_dto_1 = require("./create-user-card.dto");
class UpdateUserCardDto extends (0, mapped_types_1.PartialType)(create_user_card_dto_1.CreateUserCardDto) {
}
exports.UpdateUserCardDto = UpdateUserCardDto;
//# sourceMappingURL=update-user-card.dto.js.map