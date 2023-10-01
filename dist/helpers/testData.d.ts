export declare const starshipsTestData: {
    id: number;
    name: string;
    model: string;
    cargoCapacity: number;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    passengers: any[];
    enemies: any[];
    autonomy: number;
}[];
export declare const planetsTestData: {
    id: number;
    name: string;
    population: number;
    climate: string;
    terrain: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}[];
export declare const charactersTestData: {
    id: number;
    name: string;
    species: string;
    sensitivityToTheForce: boolean;
    currentLocation: any;
    starship: any;
    affiliations: string[];
}[];
export declare const characterDtosTestData: {
    name: string;
    species: string;
    sensitivityToTheForce: boolean;
}[];
export declare const planetDtosTestData: {
    name: string;
    population: number;
    climate: string;
    terrain: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}[];
export declare const starshipDtosTestData: {
    name: string;
    model: string;
    cargoCapacity: number;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    passengers: any[];
    enemies: any[];
}[];
