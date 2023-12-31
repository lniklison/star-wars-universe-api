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
exports.PlanetController = void 0;
const common_1 = require("@nestjs/common");
const planet_service_1 = require("./planet.service");
const create_planet_dto_1 = require("./dto/create-planet.dto");
const update_planet_dto_1 = require("./dto/update-planet.dto");
let PlanetController = class PlanetController {
    constructor(planetService) {
        this.planetService = planetService;
    }
    async create(createPlanetDto) {
        return await this.planetService.create(createPlanetDto);
    }
    async findAll() {
        return await this.planetService.findAll();
    }
    async findOne(id) {
        return await this.planetService.findOne(+id);
    }
    async update(id, updatePlanetDto) {
        return await this.planetService.update(+id, updatePlanetDto);
    }
    async remove(id) {
        return await this.planetService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_planet_dto_1.CreatePlanetDto]),
    __metadata("design:returntype", Promise)
], PlanetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_planet_dto_1.UpdatePlanetDto]),
    __metadata("design:returntype", Promise)
], PlanetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanetController.prototype, "remove", null);
PlanetController = __decorate([
    (0, common_1.Controller)('planet'),
    __metadata("design:paramtypes", [planet_service_1.PlanetService])
], PlanetController);
exports.PlanetController = PlanetController;
//# sourceMappingURL=planet.controller.js.map