import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { PlanetService } from './planet.service';

describe('PlanetService', () => {
  let service: PlanetService;

  const mockPlanetRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetService,
        {
          provide: getRepositoryToken(Planet),
          useValue: mockPlanetRepository,
        },
      ],
    }).compile();

    service = module.get<PlanetService>(PlanetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('create', () => {
    it('should create and return a planet', async () => {
      const createPlanetDto = { name: 'Earth', climate: 'temperate', terrain: 'grasslands', population: 1000000, coordinates: { latitude: 1, longitude: 1 } };
      mockPlanetRepository.save.mockResolvedValue(createPlanetDto);

      const result = await service.create(createPlanetDto);
      expect(result.name).toEqual(createPlanetDto.name);
    });
  });

  describe('findAll', () => {
    it('should return all planets', async () => {
      const planets = [{ name: 'Earth' }, { name: 'Mars' }];
      mockPlanetRepository.find.mockResolvedValue(planets);

      const result = await service.findAll();
      expect(result.length).toEqual(2);
    });
  });

  describe('findOne', () => {
    it('should return a planet by id', async () => {
      const planet = { id: 1, name: 'Earth' };
      mockPlanetRepository.findOne.mockResolvedValue(planet);

      const result = await service.findOne(1);
      expect(result.name).toEqual(planet.name);
    });

    it('should throw an error if planet is not found by id', async () => {
      mockPlanetRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a planet', async () => {
      const planet = { id: 1, name: 'Mars' };
      mockPlanetRepository.preload.mockResolvedValue(planet);
      mockPlanetRepository.save.mockResolvedValue(planet);

      const result = await service.update(1, { name: 'Mars' });
      expect(result.name).toEqual(planet.name);
    });

    it('should throw an error if updating a non-existent planet', async () => {
      mockPlanetRepository.preload.mockResolvedValue(null);
      await expect(service.update(1, { name: 'Mars' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a planet', async () => {
      mockPlanetRepository.delete.mockResolvedValue({ affected: 1 });
      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should throw an error if deleting a non-existent planet', async () => {
      mockPlanetRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });


});
