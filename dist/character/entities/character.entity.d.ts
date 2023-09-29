import { Starship } from 'src/starship/entities/starship.entity';
import { Planet } from '../../planet/entities/planet.entity';
export declare class Character {
    id: number;
    name: string;
    species: string;
    sensitivityToTheForce: boolean;
    currentLocation: Planet;
    starship: Starship;
    constructor(name: string, species: string, sensitivityToTheForce: boolean, currentLocation: Planet, starship: Starship);
}
