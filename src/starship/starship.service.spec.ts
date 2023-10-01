import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Planet } from 'src/planet/entities/planet.entity';
import { PlanetService } from '../planet/planet.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { StarshipService } from './starship.service';
import { starshipsTestData, starshipDtosTestData, planetsTestData } from '../helpers/testData';
import { ErrorMessages } from '../helpers/errorMessages';

describe('StarshipService', () => {
  let starshipService: StarshipService;


  const starshipRepositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  };

  const planetServiceMock = {
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipService,
        { provide: getRepositoryToken(Starship), useValue: starshipRepositoryMock }, 
        { provide: PlanetService, useValue: planetServiceMock },
      ],
    }).compile();

    starshipService = module.get<StarshipService>(StarshipService);
  });

  it('should be defined', () => {
    expect(starshipService).toBeDefined();
  });

    describe('Basic CRUD operations', () => {
      
        it('should create a starship', async () => {
            const dto : CreateStarshipDto = starshipDtosTestData[0];
            starshipRepositoryMock.create.mockReturnValue(dto);
            starshipRepositoryMock.save.mockResolvedValue(dto);

            expect(await starshipService.create(dto)).toEqual(dto);
        });

        it('should find all starships', async () => {
            const starships: Starship[] = [];
            starshipRepositoryMock.find.mockResolvedValue(starships);

            expect(await starshipService.findAll()).toEqual(starships);
        });

        it('should find one starship', async () => {
            const id = 3;
            const starship = starshipsTestData[2];
            starshipRepositoryMock.findOne.mockResolvedValue(starship);

            expect(await starshipService.findOne(id)).toEqual(starship);
        });

        it('should update a starship', async () => {
            const id = 1;
            const updateDto = new UpdateStarshipDto();
            starshipRepositoryMock.update.mockResolvedValue({});
            starshipRepositoryMock.findOne.mockResolvedValue(updateDto);

            expect(await starshipService.update(id, updateDto)).toEqual(updateDto);
        });

        it('should remove a starship', async () => {
            const id = 1;
            starshipRepositoryMock.delete.mockResolvedValue({ affected: 1 });

            await expect(starshipService.remove(id)).resolves.not.toThrow();
        });

    });

    describe('Distance calculations', () => {

        it('should calculate distance between a starship and a planet', async () => {
            const id = 1;
            const planetId = 2;
            const starship = starshipsTestData[3]
            starship.currentLocation = { latitude: 10, longitude: 10 };
            const planet = planetsTestData[1];
            planet.coordinates = { latitude: 20, longitude: 20 };

            starshipRepositoryMock.findOne.mockResolvedValueOnce(starship);
            planetServiceMock.findOne.mockResolvedValueOnce(planet);

            const distance = await starshipService.calculateDistance(id, planetId);
            expect(typeof distance).toBe('number');
        });

        it('should calculate distance between two starships', async () => {
            const starshipId = 1;
            const planetId = 2;
            const starship = {
                id: starshipId,
                currentLocation: { latitude: 0, longitude: 0 }
            };
            const planet = {
                id: planetId,
                coordinates: { latitude: 0, longitude: 180 } 
            };

            starshipRepositoryMock.findOne.mockResolvedValueOnce(starship);
            planetServiceMock.findOne.mockResolvedValueOnce(planet);

            const distance = await starshipService.calculateDistance(starshipId, planetId);
            expect(distance).toBeCloseTo(20015.0867); 
        });

        it('should throw an error if the starship is not found', async () => {
            jest.spyOn(starshipRepositoryMock, 'findOne').mockResolvedValue(undefined);

            await expect(starshipService.calculateDistance(9999, 1)).rejects.toThrow(ErrorMessages.STARSHIP_NOT_FOUND);
        });

        it('should throw an error if the planet is not found', async () => {
            jest.spyOn(starshipRepositoryMock, 'findOne').mockResolvedValue(starshipsTestData[0]);
            jest.spyOn(planetServiceMock, 'findOne').mockResolvedValue(undefined);

            await expect(starshipService.calculateDistance(1, 9999)).rejects.toThrow(ErrorMessages.PLANET_NOT_FOUND);
        });

    });

    describe('Enemy starship operations', () => {
        it('should get nearby enemies', async () => {
            const id = 1;
            const range = 1250;
            const starship = starshipsTestData[5];
            starship.currentLocation = { latitude: 10, longitude: 10 };
            const enemyStarship1 = starshipsTestData[6];
            enemyStarship1.currentLocation = { latitude: 15, longitude: 15 };
            const enemyStarship2 = starshipsTestData[7];
            enemyStarship2.currentLocation = { latitude: 50, longitude: 50 };
            starship.enemies = [enemyStarship1, enemyStarship2];

            starshipRepositoryMock.findOne.mockResolvedValue(starship);

            const nearbyEnemies = await starshipService.getNearbyEnemies(id, range);
            expect(nearbyEnemies.length).toBe(1);
            expect(nearbyEnemies[0]).toEqual(enemyStarship1);
        });

        it('should throw an error if the starship is not found', async () => {
            jest.spyOn(starshipRepositoryMock, 'findOne').mockResolvedValue(undefined);
            
            await expect(starshipService.spawnEnemyStarship(9999)).rejects.toThrow(ErrorMessages.STARSHIP_NOT_FOUND);
        });

        it('should throw an error if the starship is not found', async () => {
            jest.spyOn(starshipRepositoryMock, 'findOne').mockResolvedValue(undefined);

            await expect(starshipService.getNearbyEnemies(9999, 100)).rejects.toThrow(ErrorMessages.STARSHIP_NOT_FOUND);
        });

        it('should throw an error if the starship is not found', async () => {
            jest.spyOn(starshipRepositoryMock, 'findOne').mockResolvedValue(undefined);

            await expect(starshipService.getReachablePlanets(9999)).rejects.toThrow(ErrorMessages.STARSHIP_NOT_FOUND);
        });

        it('should return reachable planets', async () => {
          jest.spyOn(starshipRepositoryMock, 'findOne').mockResolvedValue(starshipsTestData[13]);

          jest.spyOn(planetServiceMock, 'findAll').mockImplementation(async () => [
            planetsTestData[12],
            planetsTestData[13],
            planetsTestData[14]
          ]);
      
          const result = await starshipService.getReachablePlanets(14);
          expect(result).toEqual([ planetsTestData[17], planetsTestData[18], planetsTestData[19] ]);
        });
    });

    describe('Random generators', () => {

        it('should generate a random starship name', async () => {
            const id = 1;
            const originalStarship = starshipsTestData[8];
            originalStarship.enemies = [];

            starshipRepositoryMock.findOne.mockResolvedValue(originalStarship);

            const spy = jest.spyOn(starshipService as any, 'generateRandomStarshipName');
            await starshipService.spawnEnemyStarship(id);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        it('should generate a random starship model', async () => {
            const id = 10;
            const originalStarship = starshipsTestData[9];
            originalStarship.enemies = [];

            starshipRepositoryMock.findOne.mockResolvedValue(originalStarship);

            const spy = jest.spyOn(starshipService as any, 'generateRandomStarshipModel');
            await starshipService.spawnEnemyStarship(id);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        it('should generate a random cargo capacity', async () => {
            const id = 11;
            const originalStarship = starshipsTestData[10];
            originalStarship.enemies = [];

            starshipRepositoryMock.findOne.mockResolvedValue(originalStarship);

            const spy = jest.spyOn(starshipService as any, 'generateRandomCargoCapacity');
            await starshipService.spawnEnemyStarship(id);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        it('should generate random coordinates', async () => {
            const id = 12;
            const originalStarship = starshipsTestData[11];
            originalStarship.enemies = [];

            starshipRepositoryMock.findOne.mockResolvedValue(originalStarship);

            const spy = jest.spyOn(starshipService as any, 'generateRandomCoordinates');
            await starshipService.spawnEnemyStarship(id);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

    });

});
