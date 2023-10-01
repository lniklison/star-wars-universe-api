import { Starship } from '../../starship/entities/starship.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Planet } from '../../planet/entities/planet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('characters')
export class Character {

    @ApiProperty({
        description: 'Unique identifier for the character',
        example: 1
    })
    @PrimaryGeneratedColumn()
    public id: number;
    
    @ApiProperty({
        description: 'Name of the character',
        example: 'Luke Skywalker'
    })
    @Column({ type: 'varchar', length: 255 })
    public name: string;

    @ApiProperty({
        description: 'Species of the character',
        example: 'Human'
    })
    @Column({ type: 'varchar', length: 255 })
    public species: string;

    @ApiProperty({
        description: 'Indicates if the character has sensitivity to the Force',
        example: true
    })
    @Column({ type: 'boolean' })
    public sensitivityToTheForce: boolean;

    @ApiProperty({ type: () => Planet })
    @ManyToOne(() => Planet, planet => planet, { eager: true })
    @JoinColumn({ name: 'planet_id' }) // This will create a column 'planet_id' to store the reference to Planet
    public currentLocation: Planet;

    @ApiProperty({ type: () => Starship })
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
