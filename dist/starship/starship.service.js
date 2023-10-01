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
exports.StarshipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errorMessages_1 = require("../helpers/errorMessages");
const planet_service_1 = require("../planet/planet.service");
const typeorm_2 = require("typeorm");
const starship_entity_1 = require("./entities/starship.entity");
let StarshipService = class StarshipService {
    constructor(starshipRepository, planetService) {
        this.starshipRepository = starshipRepository;
        this.planetService = planetService;
    }
    async create(createStarshipDto) {
        const newStarship = this.starshipRepository.create(createStarshipDto);
        return await this.starshipRepository.save(newStarship);
    }
    async findAll() {
        return await this.starshipRepository.find();
    }
    async findOne(id) {
        return await this.starshipRepository.findOne({ where: { id: id } });
    }
    async update(id, updateStarshipDto) {
        await this.starshipRepository.update(id, updateStarshipDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.starshipRepository.delete(id);
    }
    async calculateDistance(id, planetId) {
        const starship = await this.starshipRepository.findOne({ where: { id: id } });
        const planet = await this.planetService.findOne(planetId);
        if (!starship) {
            throw new common_1.NotFoundException(errorMessages_1.ErrorMessages.STARSHIP_NOT_FOUND);
        }
        if (!planet) {
            throw new common_1.NotFoundException(errorMessages_1.ErrorMessages.PLANET_NOT_FOUND);
        }
        var distance = this.calculateDistanceBetweenCoordinates(starship.currentLocation, planet.coordinates);
        return distance;
    }
    calculateDistanceBetweenCoordinates(coord1, coord2) {
        const R = 6371;
        const deg2rad = (degree) => {
            return degree * (Math.PI / 180);
        };
        const dLat = deg2rad(coord2.latitude - coord1.latitude);
        const dLon = deg2rad(coord2.longitude - coord1.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(coord1.latitude)) * Math.cos(deg2rad(coord2.latitude)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }
    async spawnEnemyStarship(starshipId) {
        let starship = await this.starshipRepository.findOne({ where: { id: starshipId } });
        if (!starship) {
            throw new Error(errorMessages_1.ErrorMessages.STARSHIP_NOT_FOUND);
        }
        let enemyStarship = await this.generateRandomStarship();
        starship.enemies.push(enemyStarship);
        return this.starshipRepository.save(starship);
    }
    async generateRandomStarship() {
        const starshipName = this.generateRandomStarshipName();
        const starshipModel = this.generateRandomStarshipModel();
        const starshipCargoCapacity = this.generateRandomCargoCapacity();
        const starshipCurrentLocation = this.generateRandomCoordinates();
        const starship = new starship_entity_1.Starship(starshipName, starshipModel, starshipCargoCapacity, starshipCurrentLocation);
        await this.starshipRepository.save(starship);
        return starship;
    }
    generateRandomStarshipName() {
        const names = ["Falcon", "Destroyer", "Cruiser", "Voyager", "Explorer"];
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    }
    generateRandomStarshipModel() {
        const models = ["Model A", "Model B", "Model C", "Model D", "Model E"];
        const randomIndex = Math.floor(Math.random() * models.length);
        return models[randomIndex];
    }
    generateRandomCargoCapacity() {
        return Math.floor(Math.random() * 10000);
    }
    generateRandomCoordinates() {
        const latitude = (Math.random() * 180) - 90;
        const longitude = (Math.random() * 360) - 180;
        return {
            latitude: parseFloat(latitude.toFixed(6)),
            longitude: parseFloat(longitude.toFixed(6))
        };
    }
    async getNearbyEnemies(id, range) {
        const starship = await this.starshipRepository.findOne({ where: { id: id } });
        if (!starship) {
            throw new Error(errorMessages_1.ErrorMessages.STARSHIP_NOT_FOUND);
        }
        let nearbyEnemies = [];
        starship.enemies.forEach(enemy => {
            if (this.calculateDistanceBetweenCoordinates(starship.currentLocation, enemy.currentLocation) < range)
                nearbyEnemies.push(enemy);
        });
        return nearbyEnemies;
    }
    async getReachablePlanets(starshipId) {
        const starship = await this.starshipRepository.findOne({ where: { id: starshipId } });
        if (!starship) {
            throw new common_1.NotFoundException(errorMessages_1.ErrorMessages.STARSHIP_NOT_FOUND);
        }
        const allPlanets = await this.planetService.findAll();
        const reachablePlanets = allPlanets.filter(planet => {
            const distance = this.calculateDistanceBetweenCoordinates(starship.currentLocation, planet.coordinates);
            return distance <= starship.autonomy;
        });
        return reachablePlanets;
    }
};
StarshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(starship_entity_1.Starship)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        planet_service_1.PlanetService])
], StarshipService);
exports.StarshipService = StarshipService;
//# sourceMappingURL=starship.service.js.map