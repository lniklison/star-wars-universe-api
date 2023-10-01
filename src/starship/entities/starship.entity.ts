import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Character } from '../../character/entities/character.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('starships') 
export class Starship {

    @ApiProperty() 
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 255 })
    public name: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 255 })
    public model: string;

    @ApiProperty()
    @Column({ type: 'int' })
    public cargoCapacity: number;

    @ApiProperty()
    @Column({ type: 'int' })
    public autonomy: number;

    @ApiProperty({ type: 'object', description: 'Current location of the starship' })
    @Column('json')
    public currentLocation: { latitude: number; longitude: number; };

    @ApiProperty({ type: () => Character, isArray: true }) 
    @ManyToMany(type => Character, character => character.starship)
    @JoinTable()
    passengers: Character[];

    @ApiProperty({ type: () => Starship, isArray: true, description: 'Enemies of the starship' })
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
