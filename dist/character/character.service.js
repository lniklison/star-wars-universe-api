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
exports.CharacterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errorMessages_1 = require("../helpers/errorMessages");
const planet_service_1 = require("../planet/planet.service");
const starship_service_1 = require("../starship/starship.service");
const typeorm_2 = require("typeorm");
const character_entity_1 = require("./entities/character.entity");
let CharacterService = class CharacterService {
    constructor(characterRepository, planetService, starshipService) {
        this.characterRepository = characterRepository;
        this.planetService = planetService;
        this.starshipService = starshipService;
    }
    async create(createCharacterDto) {
        const character = this.characterRepository.create(createCharacterDto);
        return await this.characterRepository.save(character);
    }
    async findAll() {
        return await this.characterRepository.find();
    }
    async findOne(id) {
        const character = await this.characterRepository.findOne({ where: { id: id } });
        if (!character) {
            throw new common_1.NotFoundException(errorMessages_1.ErrorMessages.CHARACTER_NOT_FOUND);
        }
        return character;
    }
    async update(id, updateCharacterDto) {
        await this.characterRepository.update(id, updateCharacterDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.characterRepository.delete(id);
    }
    async relocateCharacter(characterId, targetPlanetId) {
        const character = await this.characterRepository.findOne({ where: { id: characterId } });
        if (!character) {
            throw new Error(errorMessages_1.ErrorMessages.CHARACTER_NOT_FOUND);
        }
        const planet = await this.planetService.findOne(targetPlanetId);
        if (!planet) {
            throw new Error(errorMessages_1.ErrorMessages.PLANET_NOT_FOUND);
        }
        character.currentLocation = planet;
        return await this.characterRepository.save(character);
    }
    async boardStarship(characterId, starshipId) {
        const character = await this.characterRepository.findOne({ where: { id: characterId } });
        if (!character) {
            throw new Error(errorMessages_1.ErrorMessages.CHARACTER_NOT_FOUND);
        }
        const starship = await this.starshipService.findOne(starshipId);
        if (!starship) {
            throw new Error(errorMessages_1.ErrorMessages.STARSHIP_NOT_FOUND);
        }
        character.starship = starship;
        return this.characterRepository.save(character);
    }
    async disembarkStarship(characterId) {
        const character = await this.characterRepository.findOne({ where: { id: characterId } });
        if (!character) {
            throw new Error(errorMessages_1.ErrorMessages.CHARACTER_NOT_FOUND);
        }
        character.starship = null;
        return this.characterRepository.save(character);
    }
};
CharacterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(character_entity_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        planet_service_1.PlanetService,
        starship_service_1.StarshipService])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map