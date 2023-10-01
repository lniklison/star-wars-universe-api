import { Test, TestingModule } from '@nestjs/testing';
import { PlanetController } from './planet.controller';
import { PlanetService } from './planet.service';

describe('PlanetController', () => {
  let controller: PlanetController;

  const mockPlanetService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    remove: jest.fn().mockResolvedValue({}),
    // add other methods used in the controller
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetController],
      providers: [
        {
          provide: PlanetService,
          useValue: mockPlanetService,
        },
      ],
    }).compile();

    controller = module.get<PlanetController>(PlanetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a planet', async () => {
      const createPlanetDto = { name: 'Earth', climate: 'temperate', terrain: 'grasslands', population: 1000000, coordinates: { latitude: 1, longitude: 1 } };
      mockPlanetService.create.mockResolvedValue(createPlanetDto);

      const result = await controller.create(createPlanetDto);
      expect(result.name).toEqual(createPlanetDto.name);
    });
  });

  describe('findAll', () => {
    it('should return all planets', async () => {
      const planets = [{ name: 'Earth' }, { name: 'Mars' }];
      mockPlanetService.findAll.mockResolvedValue(planets);

      const result = await controller.findAll();
      expect(result.length).toEqual(2);
    });
  });

  describe('findOne', () => {
    it('should return a planet by id', async () => {
      const planet = { id: 1, name: 'Earth' };
      mockPlanetService.findOne.mockResolvedValue(planet);

      const result = await controller.findOne('1');
      expect(result.name).toEqual(planet.name);
    });
  });

  describe('update', () => {
    it('should update and return a planet', async () => {
      const planet = { id: 1, name: 'Mars' };
      const updatePlanetDto = { name: 'Mars' };
      mockPlanetService.update.mockResolvedValue(planet);

      const result = await controller.update('1', updatePlanetDto);
      expect(result.name).toEqual(planet.name);
    });
  });

  describe('remove', () => {
    it('should delete a planet by id', async () => {
      const id = '1';
      mockPlanetService.remove.mockResolvedValue(undefined);

      await expect(controller.remove(id)).resolves.not.toThrow();
    });
  });
});





