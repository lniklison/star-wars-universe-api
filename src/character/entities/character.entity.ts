import { Starship } from 'src/starship/entities/starship.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Planet } from '../../planet/entities/planet.entity';

@Entity('characters') // Name of the table in the database
export class Character {

    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', length: 255 })
    public name: string;

    @Column({ type: 'varchar', length: 255 })
    public species: string;

    @Column({ type: 'boolean' })
    public sensitivityToTheForce: boolean;

    @ManyToOne(() => Planet, planet => planet, { eager: true })
    @JoinColumn({ name: 'planet_id' }) // This will create a column 'planet_id' to store the reference to Planet
    public currentLocation: Planet;

    @ManyToOne(type => Starship, starship => starship.passengers)
    starship: Starship;

    constructor(
        name: string,
        species: string,
        sensitivityToTheForce: boolean,
        currentLocation: Planet,
        starship: Starship
    ) {
        this.name = name;
        this.species = species;
        this.sensitivityToTheForce = sensitivityToTheForce;
        this.currentLocation = currentLocation;
        this.starship = starship;
    }
}
