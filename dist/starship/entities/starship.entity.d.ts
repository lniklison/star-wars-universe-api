import { Character } from '../../character/entities/character.entity';
export declare class Starship {
    id: number;
    name: string;
    model: string;
    cargoCapacity: number;
    autonomy: number;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    passengers: Character[];
    enemies: Starship[];
    constructor(name: string, model: string, cargoCapacity: number, currentLocation: {
        latitude: number;
        longitude: number;
    });
}
