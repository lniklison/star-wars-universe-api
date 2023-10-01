import { PlanetService } from '../planet/planet.service';
import { StarshipService } from '../starship/starship.service';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
export declare class CharacterService {
    private characterRepository;
    private readonly planetService;
    private readonly starshipService;
    constructor(characterRepository: Repository<Character>, planetService: PlanetService, starshipService: StarshipService);
    create(createCharacterDto: CreateCharacterDto): Promise<Character>;
    findAll(): Promise<Character[]>;
    findOne(id: number): Promise<Character>;
    update(id: number, updateCharacterDto: UpdateCharacterDto): Promise<Character>;
    remove(id: number): Promise<void>;
    relocateCharacter(characterId: number, targetPlanetId: number): Promise<Character>;
    boardStarship(characterId: number, starshipId: number): Promise<Character>;
    disembarkStarship(characterId: number): Promise<Character>;
}
