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
var Starship_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Starship = void 0;
const typeorm_1 = require("typeorm");
const character_entity_1 = require("../../character/entities/character.entity");
let Starship = Starship_1 = class Starship {
    constructor(name, model, cargoCapacity, currentLocation) {
        this.name = name;
        this.model = model;
        this.cargoCapacity = cargoCapacity;
        this.currentLocation = currentLocation;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Starship.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Starship.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Starship.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Starship.prototype, "cargoCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Starship.prototype, "autonomy", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], Starship.prototype, "currentLocation", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => character_entity_1.Character, character => character.starship),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Starship.prototype, "passengers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Starship_1),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Starship.prototype, "enemies", void 0);
Starship = Starship_1 = __decorate([
    (0, typeorm_1.Entity)('starships'),
    __metadata("design:paramtypes", [String, String, Number, Object])
], Starship);
exports.Starship = Starship;
//# sourceMappingURL=starship.entity.js.map