import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
export declare class StarshipController {
    private readonly starshipService;
    constructor(starshipService: StarshipService);
    create(createStarshipDto: CreateStarshipDto): Promise<import("./entities/starship.entity").Starship>;
    findAll(): Promise<import("./entities/starship.entity").Starship[]>;
    findOne(id: string): Promise<import("./entities/starship.entity").Starship>;
    update(id: string, updateStarshipDto: UpdateStarshipDto): Promise<import("./entities/starship.entity").Starship>;
    remove(id: string): Promise<void>;
    calculateDistance(id: string, planetId: string): Promise<number>;
    getNearbyEnemies(id: string, range: string): Promise<import("./entities/starship.entity").Starship[]>;
    generateRandomEnemy(id: string): Promise<import("./entities/starship.entity").Starship>;
    getReachablePlanets(id: string): Promise<import("../planet/entities/planet.entity").Planet[]>;
}
