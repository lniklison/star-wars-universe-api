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
exports.CharacterController = void 0;
const common_1 = require("@nestjs/common");
const character_service_1 = require("./character.service");
const create_character_dto_1 = require("./dto/create-character.dto");
const update_character_dto_1 = require("./dto/update-character.dto");
let CharacterController = class CharacterController {
    constructor(characterService) {
        this.characterService = characterService;
    }
    async create(createCharacterDto) {
        return await this.characterService.create(createCharacterDto);
    }
    async findAll() {
        return await this.characterService.findAll();
    }
    async findOne(id) {
        return await this.characterService.findOne(+id);
    }
    async update(id, updateCharacterDto) {
        return await this.characterService.update(+id, updateCharacterDto);
    }
    async remove(id) {
        return await this.characterService.remove(+id);
    }
    async relocate(id, relocateDto) {
        try {
            return await this.characterService.relocateCharacter(+id, +relocateDto.planetId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async boardShip(id, shipId) {
        try {
            return await this.characterService.boardStarship(+id, shipId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async disembarkShip(id) {
        try {
            return await this.characterService.disembarkStarship(+id);
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
    __metadata("design:paramtypes", [create_character_dto_1.CreateCharacterDto]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_character_dto_1.UpdateCharacterDto]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/planet'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "relocate", null);
__decorate([
    (0, common_1.Put)(':id/board'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "boardShip", null);
__decorate([
    (0, common_1.Put)(':id/disembark'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "disembarkShip", null);
CharacterController = __decorate([
    (0, common_1.Controller)('character'),
    __metadata("design:paramtypes", [character_service_1.CharacterService])
], CharacterController);
exports.CharacterController = CharacterController;
//# sourceMappingURL=character.controller.js.map