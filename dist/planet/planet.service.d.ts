import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';
export declare class PlanetService {
    private planetRepository;
    constructor(planetRepository: Repository<Planet>);
    create(createPlanetDto: CreatePlanetDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePlanetDto: UpdatePlanetDto): string;
    remove(id: number): string;
}
