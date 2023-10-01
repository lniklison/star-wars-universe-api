import { PlanetService } from './planet.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
export declare class PlanetController {
    private readonly planetService;
    constructor(planetService: PlanetService);
    create(createPlanetDto: CreatePlanetDto): Promise<any>;
    findAll(): Promise<import("./entities/planet.entity").Planet[]>;
    findOne(id: string): Promise<import("./entities/planet.entity").Planet>;
    update(id: string, updatePlanetDto: UpdatePlanetDto): Promise<import("./entities/planet.entity").Planet>;
    remove(id: string): Promise<void>;
}
