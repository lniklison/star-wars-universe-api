export class CreatePlanetDto {

    constructor(
        public name: string,
        public population: number,
        public climate: string,
        public terrain: string,
        public coordinates: { latitude: number; longitude: number; }
    ) { }

}
