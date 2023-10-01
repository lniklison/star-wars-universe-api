export class CreateCharacterDto {
    constructor(
        public name: string,
        public species: string,
        public sensitivityToTheForce: boolean
    ) { }
}