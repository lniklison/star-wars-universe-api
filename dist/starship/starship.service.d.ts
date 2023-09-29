import { Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
export declare class StarshipService {
    private starshipRepository;
    constructor(starshipRepository: Repository<Starship>);
    create(createStarshipDto: CreateStarshipDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStarshipDto: UpdateStarshipDto): string;
    remove(id: number): string;
}
