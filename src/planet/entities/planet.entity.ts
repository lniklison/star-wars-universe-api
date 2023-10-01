import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('planets')
export class Planet {
    
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the planet.' })
    public id: number;
    
    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({ description: 'The name of the planet.' })
    public name: string;

    @Column({ type: 'int' })
    @ApiProperty({ description: 'The population of the planet.' })
    public population: number;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({ description: 'The climate of the planet.' })
    public climate: string;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({ description: 'The terrain of the planet.' })
    public terrain: string;

    @Column('json')
    @ApiProperty({ 
        description: 'The coordinates of the planet.',
        type: 'object',
        properties: {
            latitude: { type: 'number', description: 'Latitude coordinate' },
            longitude: { type: 'number', description: 'Longitude coordinate' }
        }
    })
    public coordinates: { latitude: number; longitude: number; }

    constructor(
        id: number,
        name: string,
        population: number,
        climate: string,
        terrain: string,
        coordinates: { latitude: number; longitude: number; }
    ) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.climate = climate;
        this.terrain = terrain;
        this.coordinates = coordinates;
    }
}