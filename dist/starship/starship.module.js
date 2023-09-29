"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarshipModule = void 0;
const common_1 = require("@nestjs/common");
const starship_service_1 = require("./starship.service");
const starship_controller_1 = require("./starship.controller");
const typeorm_1 = require("@nestjs/typeorm");
const starship_entity_1 = require("./entities/starship.entity");
let StarshipModule = class StarshipModule {
};
StarshipModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([starship_entity_1.Starship])],
        controllers: [starship_controller_1.StarshipController],
        providers: [starship_service_1.StarshipService]
    })
], StarshipModule);
exports.StarshipModule = StarshipModule;
//# sourceMappingURL=starship.module.js.map