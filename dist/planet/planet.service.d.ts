import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';
export declare class PlanetService {
    private planetRepository;
    constructor(planetRepository: Repository<Planet>);
    create(createPlanetDto: CreatePlanetDto): Promise<Planet>;
    findAll(): Promise<Planet[]>;
    findOne(id: number): Promise<Planet>;
    update(id: number, updatePlanetDto: UpdatePlanetDto): Promise<Planet>;
    remove(id: number): Promise<void>;
}
