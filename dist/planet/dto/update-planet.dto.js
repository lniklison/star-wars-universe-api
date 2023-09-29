"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlanetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_planet_dto_1 = require("./create-planet.dto");
class UpdatePlanetDto extends (0, mapped_types_1.PartialType)(create_planet_dto_1.CreatePlanetDto) {
}
exports.UpdatePlanetDto = UpdatePlanetDto;
//# sourceMappingURL=update-planet.dto.js.map