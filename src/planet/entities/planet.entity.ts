import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('planets')
export class Planet {
    
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', length: 255 })
    public name: string;

    @Column({ type: 'int' })
    public population: number;

    @Column({ type: 'varchar', length: 255 })
    public climate: string;

    @Column({ type: 'varchar', length: 255 })
    public terrain: string;

    @Column('json')
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
