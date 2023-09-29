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
exports.PlanetService = void 0;
const common_1 = require("@nestjs/common");
const planet_entity_1 = require("./entities/planet.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PlanetService = class PlanetService {
    constructor(planetRepository) {
        this.planetRepository = planetRepository;
    }
    create(createPlanetDto) {
        return 'This action adds a new planet';
    }
    findAll() {
        return `This action returns all planet`;
    }
    findOne(id) {
        return `This action returns a #${id} planet`;
    }
    update(id, updatePlanetDto) {
        return `This action updates a #${id} planet`;
    }
    remove(id) {
        return `This action removes a #${id} planet`;
    }
};
PlanetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(planet_entity_1.Planet)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlanetService);
exports.PlanetService = PlanetService;
//# sourceMappingURL=planet.service.js.map