import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { starshipsTestData, charactersTestData } from '../helpers/testData';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CharacterController', () => {
  let controller: CharacterController;

  const mockCharacterService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    relocateCharacter: jest.fn(),
    boardStarship: jest.fn(),
    disembarkStarship: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useValue: mockCharacterService,
        },
      ],
    }).compile();
    controller = module.get<CharacterController>(CharacterController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {

    it('should create a character', async () => {
      const dto: Character = {
          id: 1,
          name: 'Luke',
          species: 'Human',
          sensitivityToTheForce: true,
          currentLocation: null,
          starship: null,
      };
  
      mockCharacterService.create.mockResolvedValue(dto);
  
      const result = await controller.create(dto);
      
      expect(result).toEqual(dto);
    });
    
    it('should create a character', async () => {
      const dto: Character = charactersTestData[1];
      mockCharacterService.create.mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result.name).toEqual(dto.name);
      expect(result.name).toEqual(dto.name);
      expect(result.species).toEqual(dto.species);
      expect(result.sensitivityToTheForce).toEqual(dto.sensitivityToTheForce);
    });
  });

  describe('findAll', () => {
    it('should return all characters', async () => {
      const char1: Character = charactersTestData[2];

      const char2: Character = charactersTestData[3];
      const list: Character[] = [char1, char2];
      mockCharacterService.findAll.mockResolvedValue(list);

      const result = await controller.findAll();
      expect(result).toEqual(list);
    });
  });

  describe('findOne', () => {
    it('should find one character by id', async () => {
      const id = '5';
      const character: Character = charactersTestData[4];
      mockCharacterService.findOne.mockResolvedValue(character);
    
      const result = await controller.findOne(id);
    
      expect(result).toEqual(character);
      expect(mockCharacterService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a character by id and return updated character', async () => {
      const id = '6';
      const updateCharacterDto: UpdateCharacterDto = { name: 'John' };
      const updatedCharacter: Character = charactersTestData[5];
    
      mockCharacterService.update.mockResolvedValue(updatedCharacter);
    
      const result = await controller.update(id, updateCharacterDto);
    
      expect(result).toEqual(updatedCharacter);
      expect(mockCharacterService.update).toHaveBeenCalledWith(+id, updateCharacterDto);
    });
  });

  describe('remove', () => {
    it('should remove a character by id', async () => {
      const id = '1';
      const mockCharacter = {};
      mockCharacterService.findOne.mockResolvedValue(mockCharacter);
    
      await controller.remove(id);
    
      expect(mockCharacterService.remove).toHaveBeenCalledWith(+id);
    });
  });


  describe('relocate', () => {
    it('should relocate a character to a new planet successfully', async () => {
        const id = '1';
        const dto = { planetId: 2 };

        const relocatedCharacter: Character = {
          id: 1,
          name: 'Luke',
          species: 'Human',
          sensitivityToTheForce: true,
          currentLocation: {
              id: 2,
              name: 'Tatooine',
              coordinates: { latitude: 1, longitude: 1 },
              population: 2000000,
              climate: 'Arid',
              terrain: 'Desert'
          },
          starship: null
      };
      mockCharacterService.relocateCharacter.mockResolvedValue(relocatedCharacter);

        const result = await controller.relocate(id, dto);
        expect(result).toEqual(relocatedCharacter);
    });

    it('should throw an error if the relocation fails', async () => {
      mockCharacterService.relocateCharacter.mockRejectedValue(new Error('Relocation error'));

      await expect(controller.relocate('1', { planetId: 5 }))
          .rejects.toThrow(new HttpException('Relocation error', HttpStatus.BAD_REQUEST));
    });
    
  });


  describe('boardShip', () => {
    it('should make character board a starship successfully', async () => {
      const id = '1';
      const shipId = 2;
      const characterInStarship: Character = { id: 1, 
        name: 'Luke', 
        species: 'Human', 
        sensitivityToTheForce: true, 
        currentLocation: null, 
        starship:  { id: 2, name: "Star Destroyer", model: "Imperial I-class", cargoCapacity: 5000000, autonomy: 2000, currentLocation: { latitude: 15, longitude: 30 }, passengers: [], enemies: [] },
      };
    
      mockCharacterService.boardStarship.mockResolvedValue(characterInStarship);
    
      const result = await controller.boardShip(id, shipId);
    
      expect(result).toEqual(characterInStarship);
      expect(mockCharacterService.boardStarship).toHaveBeenCalledWith(+id, shipId);
    });
    
    it('should throw an error if boarding the ship fails', async () => {
      mockCharacterService.boardStarship.mockRejectedValue(new Error('Boarding error'));

      await expect(controller.boardShip('1', 5))
          .rejects.toThrow(new HttpException('Boarding error', HttpStatus.BAD_REQUEST));
    });

  });

  describe('disembarkShip', () => {
    it('should make character disembark a starship successfully', async () => {
      const id = '7';
      const disembarkedCharacter: Character = charactersTestData[6];
    
      mockCharacterService.disembarkStarship.mockResolvedValue(disembarkedCharacter);
    
      const result = await controller.disembarkShip(id);
    
      expect(result).toEqual(disembarkedCharacter);
      expect(mockCharacterService.disembarkStarship).toHaveBeenCalledWith(+id);
    });

    it('should throw an error if disembarking the ship fails', async () => {
      mockCharacterService.disembarkStarship.mockRejectedValue(new Error('Disembark error'));

      await expect(controller.disembarkShip('1'))
          .rejects.toThrow(new HttpException('Disembark error', HttpStatus.BAD_REQUEST));
    });
    
  });
});
