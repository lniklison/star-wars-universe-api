import { PlanetService } from './planet.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
export declare class PlanetController {
    private readonly planetService;
    constructor(planetService: PlanetService);
    create(createPlanetDto: CreatePlanetDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePlanetDto: UpdatePlanetDto): string;
    remove(id: string): string;
}
