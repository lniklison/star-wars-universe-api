"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanetModule = void 0;
const common_1 = require("@nestjs/common");
const planet_service_1 = require("./planet.service");
const planet_controller_1 = require("./planet.controller");
const typeorm_1 = require("@nestjs/typeorm");
const planet_entity_1 = require("./entities/planet.entity");
let PlanetModule = class PlanetModule {
};
PlanetModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([planet_entity_1.Planet])],
        controllers: [planet_controller_1.PlanetController],
        providers: [planet_service_1.PlanetService]
    })
], PlanetModule);
exports.PlanetModule = PlanetModule;
//# sourceMappingURL=planet.module.js.map