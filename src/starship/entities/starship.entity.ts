import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Character } from '../../character/entities/character.entity';

@Entity('starships') // Name of the table in the database
export class Starship {

    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', length: 255 })
    public name: string;

    @Column({ type: 'varchar', length: 255 })
    public model: string;

    @Column({ type: 'int' })
    public cargoCapacity: number;

    @Column('json')
    public currentLocation: { latitude: number; longitude: number; };


    @ManyToMany(type => Character, character => character.starship)
    @JoinTable()
    passengers: Character[];

    @ManyToMany(type => Starship)
    @JoinTable()
    enemies: Starship[];

    constructor(
        name: string,
        model: string,
        cargoCapacity: number,
        currentLocation: { latitude: number; longitude: number; },
    ) {
        this.name = name;
        this.model = model;
        this.cargoCapacity = cargoCapacity;
        this.currentLocation = currentLocation;
    }
}
