import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
export declare class CharacterService {
    private characterRepository;
    constructor(characterRepository: Repository<Character>);
    create(createCharacterDto: CreateCharacterDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCharacterDto: UpdateCharacterDto): string;
    remove(id: number): string;
}
