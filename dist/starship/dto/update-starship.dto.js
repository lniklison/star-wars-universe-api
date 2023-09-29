"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStarshipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_starship_dto_1 = require("./create-starship.dto");
class UpdateStarshipDto extends (0, mapped_types_1.PartialType)(create_starship_dto_1.CreateStarshipDto) {
}
exports.UpdateStarshipDto = UpdateStarshipDto;
//# sourceMappingURL=update-starship.dto.js.map