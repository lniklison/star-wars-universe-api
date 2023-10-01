import { PlanetService } from '../planet/planet.service';
import { Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { Planet } from 'src/planet/entities/planet.entity';
export declare class StarshipService {
    private starshipRepository;
    private readonly planetService;
    constructor(starshipRepository: Repository<Starship>, planetService: PlanetService);
    create(createStarshipDto: CreateStarshipDto): Promise<Starship>;
    findAll(): Promise<Starship[]>;
    findOne(id: number): Promise<Starship>;
    update(id: number, updateStarshipDto: UpdateStarshipDto): Promise<Starship>;
    remove(id: number): Promise<void>;
    calculateDistance(id: number, planetId: number): Promise<number>;
    private calculateDistanceBetweenCoordinates;
    spawnEnemyStarship(starshipId: number): Promise<Starship>;
    private generateRandomStarship;
    private generateRandomStarshipName;
    private generateRandomStarshipModel;
    private generateRandomCargoCapacity;
    private generateRandomCoordinates;
    getNearbyEnemies(id: number, range: number): Promise<Starship[]>;
    getReachablePlanets(starshipId: number): Promise<Planet[]>;
}
