import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetDto {
    @ApiProperty({
        description: 'Name of the planet',
        example: 'Earth'
    })
    public name: string;

    @ApiProperty({
        description: 'Population of the planet',
        example: 7800000000
    })
    public population: number;

    @ApiProperty({
        description: 'Climate of the planet',
        example: 'Temperate'
    })
    public climate: string;

    @ApiProperty({
        description: 'Terrain of the planet',
        example: 'Mountains'
    })
    public terrain: string;

    @ApiProperty({
        description: 'Coordinates of the planet',
        type: 'object',
        properties: {
            latitude: {
                type: 'number',
                example: 34.0522
            },
            longitude: {
                type: 'number',
                example: -118.2437
            }
        }
    })
    public coordinates: { latitude: number; longitude: number; }

    constructor(
        name: string,
        population: number,
        climate: string,
        terrain: string,
        coordinates: { latitude: number; longitude: number; }
    ) {
        this.name = name;
        this.population = population;
        this.climate = climate;
        this.terrain = terrain;
        this.coordinates = coordinates;
    }
}
