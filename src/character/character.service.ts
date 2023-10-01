import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessages } from '../helpers/errorMessages';
import { PlanetService } from '../planet/planet.service';
import { StarshipService } from '../starship/starship.service';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private readonly planetService: PlanetService,
    private readonly starshipService: StarshipService
  ) {}


  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const character = this.characterRepository.create(createCharacterDto);
    return await this.characterRepository.save(character);
  }

  async findAll(): Promise<Character[]> {
    return await this.characterRepository.find();
  }

  async findOne(id: number): Promise<Character> {

    const character = await this.characterRepository.findOne({ where: { id: id } });
    if (!character) {
      throw new NotFoundException(ErrorMessages.CHARACTER_NOT_FOUND);
    }
    return character;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    await this.characterRepository.update(id, updateCharacterDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.characterRepository.delete(id);
  }

  async relocateCharacter(characterId: number, targetPlanetId: number): Promise<Character> {
    const character = await this.characterRepository.findOne({ where: { id: characterId } });
    if (!character) {
        throw new Error(ErrorMessages.CHARACTER_NOT_FOUND);
    }

    const planet = await this.planetService.findOne(targetPlanetId);
    if (!planet) {
      throw new Error(ErrorMessages.PLANET_NOT_FOUND);
    }

    character.currentLocation = planet;
  
    return await this.characterRepository.save(character);
  }

  async boardStarship(characterId: number, starshipId: number): Promise<Character> {
    const character = await this.characterRepository.findOne({ where: { id: characterId } });
    if (!character) {
        throw new Error(ErrorMessages.CHARACTER_NOT_FOUND);
    }

    const starship = await this.starshipService.findOne(starshipId);
    if (!starship) {
        throw new Error(ErrorMessages.STARSHIP_NOT_FOUND);
    }

    character.starship = starship;
    return this.characterRepository.save(character);
  }

  async disembarkStarship(characterId: number): Promise<Character> {
    const character = await this.characterRepository.findOne({ where: { id: characterId } });
    if (!character) {
        throw new Error(ErrorMessages.CHARACTER_NOT_FOUND);
    }
    character.starship = null;
    return this.characterRepository.save(character);
  }
}
