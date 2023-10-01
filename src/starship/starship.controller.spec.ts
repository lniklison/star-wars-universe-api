import { Test, TestingModule } from '@nestjs/testing';
import { StarshipController } from './starship.controller';
import { StarshipService } from './starship.service';
import { starshipsTestData, starshipDtosTestData, planetsTestData } from '../helpers/testData';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ErrorMessages } from '../helpers/errorMessages';

describe('StarshipController', () => {
  let controller: StarshipController;

  // Mock StarshipService
  const mockStarshipService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    calculateDistance: jest.fn(),
    getNearbyEnemies: jest.fn(),
    spawnEnemyStarship: jest.fn(),
    getReachablePlanets: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipController],
      providers: [
        {
          provide: StarshipService,
          useValue: mockStarshipService,
        },
      ],
    }).compile();

    controller = module.get<StarshipController>(StarshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method in the service', async () => {
    const dto = starshipDtosTestData[1];
    await controller.create(dto);
    expect(mockStarshipService.create).toHaveBeenCalledWith(dto);
  });

  it('should call the findAll method in the service', async () => {
    await controller.findAll();
    expect(mockStarshipService.findAll).toHaveBeenCalled();
  });

  it('should call the findOne method in the service', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(mockStarshipService.findOne).toHaveBeenCalledWith(+id);
  });


  it('should call the update method in the service with correct id and dto', async () => {
    const id = '3';
    const dto = starshipDtosTestData[2]; // fill with some mock data for the DTO
    await controller.update(id, dto);
    expect(mockStarshipService.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should call the remove method in the service with correct id', async () => {
    const id = '1';
    await controller.remove(id);
    expect(mockStarshipService.remove).toHaveBeenCalledWith(+id);
  });

  it('should call the calculateDistance method in the service with correct id and planetId successfully', async () => {
    const id = '1';
    const planetId = '2';
    await controller.calculateDistance(id, planetId);
    expect(mockStarshipService.calculateDistance).toHaveBeenCalledWith(+id, +planetId);
  });

  it('should throw an error if starship not found when calculating distance', async () => {
    mockStarshipService.calculateDistance.mockRejectedValue(new NotFoundException(ErrorMessages.STARSHIP_NOT_FOUND));

    await expect(controller.calculateDistance('1', '2')).rejects.toEqual(new HttpException(ErrorMessages.STARSHIP_NOT_FOUND, HttpStatus.BAD_REQUEST));
  });



  it('should call the getNearbyEnemies method in the service with correct id and range', async () => {
    const id = '1';
    const range = '500';
    await controller.getNearbyEnemies(id, range);
    expect(mockStarshipService.getNearbyEnemies).toHaveBeenCalledWith(+id, +range);
  });

  it('should throw an error if starship not found when getting nearby enemies', async () => {
    mockStarshipService.getNearbyEnemies.mockRejectedValue(new NotFoundException(ErrorMessages.STARSHIP_NOT_FOUND));

    await expect(controller.getNearbyEnemies('1', '1000')).rejects.toEqual(new HttpException(ErrorMessages.STARSHIP_NOT_FOUND, HttpStatus.BAD_REQUEST));
  });


  it('should call the spawnEnemyStarship method in the service with correct id', async () => {
    const id = '1';
    await controller.generateRandomEnemy(id);
    expect(mockStarshipService.spawnEnemyStarship).toHaveBeenCalledWith(+id);
  });

  it('should throw an error if starship not found when generating an enemy', async () => {
    mockStarshipService.spawnEnemyStarship.mockRejectedValue(new NotFoundException(ErrorMessages.STARSHIP_NOT_FOUND));

    await expect(controller.generateRandomEnemy('1')).rejects.toEqual(new HttpException(ErrorMessages.STARSHIP_NOT_FOUND, HttpStatus.BAD_REQUEST));
  });

  it('should return reachable planets for a starship', async () => {
    jest.spyOn(mockStarshipService, 'getReachablePlanets').mockImplementation(async () => [
      planetsTestData[0],
      planetsTestData[1],
      planetsTestData[2],
    ]);

    const result = await controller.getReachablePlanets('1');
    expect(result).toEqual([planetsTestData[0], planetsTestData[1], planetsTestData[2]]);
  });

  it('should throw an error if starship not found when getting reachable planets', async () => {
    mockStarshipService.getReachablePlanets.mockRejectedValue(new NotFoundException(ErrorMessages.STARSHIP_NOT_FOUND));

    await expect(controller.getReachablePlanets('1')).rejects.toEqual(new HttpException(ErrorMessages.STARSHIP_NOT_FOUND, HttpStatus.BAD_REQUEST));
  });

});
