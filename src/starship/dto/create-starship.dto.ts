import { Character } from "src/character/entities/character.entity";
import { Starship } from "../entities/starship.entity";

export class CreateStarshipDto {
    constructor(
        public name: string,
        public model: string,
        public cargoCapacity: number,
        public currentLocation: { latitude: number; longitude: number; },
        public passengers: Character[],
        public enemies: Starship[],
    ) { }
}