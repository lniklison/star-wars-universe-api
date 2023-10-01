"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const planet_module_1 = require("./planet/planet.module");
const character_module_1 = require("./character/character.module");
const starship_module_1 = require("./starship/starship.module");
const typeorm_1 = require("@nestjs/typeorm");
const planet_entity_1 = require("./planet/entities/planet.entity");
const starship_entity_1 = require("./starship/entities/starship.entity");
const character_entity_1 = require("./character/entities/character.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [planet_module_1.PlanetModule,
            character_module_1.CharacterModule,
            starship_module_1.StarshipModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'star-wars-db',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'starWars',
                entities: [planet_entity_1.Planet, character_entity_1.Character, starship_entity_1.Starship],
                synchronize: true,
            }),],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map