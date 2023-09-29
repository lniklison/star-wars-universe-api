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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const starship_entity_1 = require("../../starship/entities/starship.entity");
const typeorm_1 = require("typeorm");
const planet_entity_1 = require("../../planet/entities/planet.entity");
let Character = class Character {
    constructor(name, species, sensitivityToTheForce, currentLocation, starship) {
        this.name = name;
        this.species = species;
        this.sensitivityToTheForce = sensitivityToTheForce;
        this.currentLocation = currentLocation;
        this.starship = starship;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Character.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Character.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Character.prototype, "sensitivityToTheForce", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => planet_entity_1.Planet, planet => planet, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'planet_id' }),
    __metadata("design:type", planet_entity_1.Planet)
], Character.prototype, "currentLocation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => starship_entity_1.Starship, starship => starship.passengers),
    __metadata("design:type", starship_entity_1.Starship)
], Character.prototype, "starship", void 0);
Character = __decorate([
    (0, typeorm_1.Entity)('characters'),
    __metadata("design:paramtypes", [String, String, Boolean, planet_entity_1.Planet,
        starship_entity_1.Starship])
], Character);
exports.Character = Character;
//# sourceMappingURL=character.entity.js.map