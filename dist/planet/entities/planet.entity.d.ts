export declare class Planet {
    id: number;
    name: string;
    population: number;
    climate: string;
    terrain: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    constructor(id: number, name: string, population: number, climate: string, terrain: string, coordinates: {
        latitude: number;
        longitude: number;
    });
}
