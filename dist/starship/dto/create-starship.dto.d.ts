import { Character } from "src/character/entities/character.entity";
import { Starship } from "../entities/starship.entity";
export declare class CreateStarshipDto {
    name: string;
    model: string;
    cargoCapacity: number;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    passengers: Character[];
    enemies: Starship[];
    constructor(name: string, model: string, cargoCapacity: number, currentLocation: {
        latitude: number;
        longitude: number;
    }, passengers: Character[], enemies: Starship[]);
}
