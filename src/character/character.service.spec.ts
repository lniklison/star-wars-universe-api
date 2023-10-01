import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorMessages } from '../helpers/errorMessages';
import { PlanetService } from '../planet/planet.service';
import { StarshipService } from '../starship/starship.service';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';
import { characterDtosTestData, charactersTestData } from '../helpers/testData';

describe('CharacterService', () => {
  let service: CharacterService;
  let mockCharacterRepository;
  let mockPlanetService;
  let mockStarshipService;


  beforeEach(async () => {
    mockCharacterRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    mockPlanetService = {
      findOne: jest.fn(),
    };

    mockStarshipService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getRepositoryToken(Character),
          useValue: mockCharacterRepository,
        },
        {
          provide: PlanetService,
          useValue: mockPlanetService,
        },
        {
          provide: StarshipService,
          useValue: mockStarshipService,
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a character', async () => {
      const dto = characterDtosTestData[0];
      mockCharacterRepository.save.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
    });

    it('should handle any unexpected error', async () => {
      const dto = characterDtosTestData[1];
      mockCharacterRepository.save.mockRejectedValue(new Error('Unexpected error'));

      await expect(service.create(dto)).rejects.toThrow('Unexpected error');
    });
  });

  describe('findAll', () => {
    it('should return an array of characters', async () => {
      const characters = [];
      mockCharacterRepository.find.mockResolvedValue(characters);

      const result = await service.findAll();
      expect(result).toEqual(characters);
    });
  });

  describe('findOne', () => {
    it('should return a single character', async () => {
      const characterId = 1;
      const character = { };
      mockCharacterRepository.findOne.mockResolvedValue(character);

      const result = await service.findOne(characterId);
      expect(result).toEqual(character);
    });

    it('should throw an error if character not found', async () => {
      const characterId = 1;
      mockCharacterRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(characterId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
      it('should update the character and return the updated character', async () => {
          const id = 1;
          const updateCharacterDto = { name: 'UpdatedName' }; 
          const updatedCharacter = charactersTestData[0];

          // Mocks
          mockCharacterRepository.update.mockResolvedValue(undefined);
          mockCharacterRepository.findOne.mockResolvedValue(updatedCharacter);

          const result = await service.update(id, updateCharacterDto as any);
          
          expect(mockCharacterRepository.update).toHaveBeenCalledWith(id, updateCharacterDto);
          expect(mockCharacterRepository.findOne).toHaveBeenCalledWith({ where: { id } });
          expect(result).toEqual(updatedCharacter);
      });
  });

  describe('remove', () => {
      it('should remove the character with the given id', async () => {
          const id = 1;
          mockCharacterRepository.delete.mockResolvedValue(undefined);

          await service.remove(id);
          
          expect(mockCharacterRepository.delete).toHaveBeenCalledWith(id);
      });
  });

  describe('relocateCharacter', () => {
    it('should relocate a character to a new planet', async () => {
      const characterId = 1;
      const targetPlanetId = 2;
      const character = { currentLocation: 1};
      const planet = { id: targetPlanetId};

      mockCharacterRepository.findOne.mockResolvedValue(character);
      mockPlanetService.findOne.mockResolvedValue(planet);
      mockCharacterRepository.save.mockImplementation(char => char); 

      const result = await service.relocateCharacter(characterId, targetPlanetId);
      expect(result.currentLocation.id).toEqual(targetPlanetId);
    });

    it('should throw an error if the planet is not found', async () => {
      const characterId = 1;
      const targetPlanetId = 2;
      const character = { };

      mockCharacterRepository.findOne.mockResolvedValue(character);
      mockPlanetService.findOne.mockResolvedValue(null);

      await expect(service.relocateCharacter(characterId, targetPlanetId)).rejects.toThrow(ErrorMessages.PLANET_NOT_FOUND);
    });

    it('should throw an error if the character is not found', async () => {
      const characterId = 1;
      const targetPlanetId = 2;

      mockCharacterRepository.findOne.mockResolvedValue(null);
  
      await expect(service.relocateCharacter(characterId, targetPlanetId)).rejects.toThrow(ErrorMessages.CHARACTER_NOT_FOUND);
     });
  
  });

  describe('boardStarship', () => {
    it('should throw an error if the character is not found when boarding', async () => {
      const characterId = 1;
      const starshipId = 2;
    
      mockCharacterRepository.findOne.mockResolvedValue(null);
    
      await expect(service.boardStarship(characterId, starshipId)).rejects.toThrow(ErrorMessages.CHARACTER_NOT_FOUND);
    });
    
    it('should throw an error if the starship is not found when boarding', async () => {
      const characterId = 1;
      const starshipId = 2;
      const character = { /* some mocked character data */ };
    
      mockCharacterRepository.findOne.mockResolvedValue(character);
      mockStarshipService.findOne.mockResolvedValue(null);
    
      await expect(service.boardStarship(characterId, starshipId)).rejects.toThrow(ErrorMessages.STARSHIP_NOT_FOUND);
    });
    
    it('should board the starship successfully', async () => {
      const characterId = 1;
      const starshipId = 2;
      const character = { };
      const starship = { };
    
      mockCharacterRepository.findOne.mockResolvedValue(character);
      mockStarshipService.findOne.mockResolvedValue(starship);
      mockCharacterRepository.save.mockResolvedValue({ ...character, starship });
    
      const result = await service.boardStarship(characterId, starshipId);
      expect(result.starship).toEqual(starship);
    });
  });

  describe('disembarkStarship', () => {
    it('should throw an error if the character is not found when disembarking', async () => {
      const characterId = 1;
    
      mockCharacterRepository.findOne.mockResolvedValue(null);
    
      await expect(service.disembarkStarship(characterId)).rejects.toThrow(ErrorMessages.CHARACTER_NOT_FOUND);
    });
    
    it('should disembark the starship successfully', async () => {
      const characterId = 1;
      const character = { };
    
      mockCharacterRepository.findOne.mockResolvedValue(character);
      mockCharacterRepository.save.mockResolvedValue({ ...character, starship: null });
    
      const result = await service.disembarkStarship(characterId);
      expect(result.starship).toBeNull();
    });    
  });
});




