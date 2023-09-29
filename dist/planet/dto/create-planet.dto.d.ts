export declare class CreatePlanetDto {
    name: string;
    population: number;
    climate: string;
    terrain: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    constructor(name: string, population: number, climate: string, terrain: string, coordinates: {
        latitude: number;
        longitude: number;
    });
}
