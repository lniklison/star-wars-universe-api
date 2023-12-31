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
exports.StarshipController = void 0;
const common_1 = require("@nestjs/common");
const starship_service_1 = require("./starship.service");
const create_starship_dto_1 = require("./dto/create-starship.dto");
const update_starship_dto_1 = require("./dto/update-starship.dto");
let StarshipController = class StarshipController {
    constructor(starshipService) {
        this.starshipService = starshipService;
    }
    async create(createStarshipDto) {
        return await this.starshipService.create(createStarshipDto);
    }
    async findAll() {
        return await this.starshipService.findAll();
    }
    async findOne(id) {
        return await this.starshipService.findOne(+id);
    }
    async update(id, updateStarshipDto) {
        return await this.starshipService.update(+id, updateStarshipDto);
    }
    async remove(id) {
        return await this.starshipService.remove(+id);
    }
    async calculateDistance(id, planetId) {
        try {
            return await this.starshipService.calculateDistance(+id, +planetId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getNearbyEnemies(id, range) {
        try {
            return await this.starshipService.getNearbyEnemies(+id, +range);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async generateRandomEnemy(id) {
        try {
            return await this.starshipService.spawnEnemyStarship(+id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getReachablePlanets(id) {
        try {
            return await this.starshipService.getReachablePlanets(+id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_starship_dto_1.CreateStarshipDto]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_starship_dto_1.UpdateStarshipDto]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/distance/:planetId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('planetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "calculateDistance", null);
__decorate([
    (0, common_1.Get)(':id/enemies/:range'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('range')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "getNearbyEnemies", null);
__decorate([
    (0, common_1.Post)(':id/generateEnemy'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "generateRandomEnemy", null);
__decorate([
    (0, common_1.Get)(':id/reachablePlanets'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "getReachablePlanets", null);
StarshipController = __decorate([
    (0, common_1.Controller)('starship'),
    __metadata("design:paramtypes", [starship_service_1.StarshipService])
], StarshipController);
exports.StarshipController = StarshipController;
//# sourceMappingURL=starship.controller.js.map