"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTapDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tap_dto_1 = require("./create-tap.dto");
class UpdateTapDto extends (0, mapped_types_1.PartialType)(create_tap_dto_1.CreateTapDto) {
}
exports.UpdateTapDto = UpdateTapDto;
//# sourceMappingURL=update-tap.dto.js.map