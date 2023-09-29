import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
export declare class StarshipController {
    private readonly starshipService;
    constructor(starshipService: StarshipService);
    create(createStarshipDto: CreateStarshipDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStarshipDto: UpdateStarshipDto): string;
    remove(id: string): string;
}
