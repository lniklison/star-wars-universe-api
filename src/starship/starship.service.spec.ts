import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { StarshipService } from './starship.service';

describe('StarshipService', () => {
  let service: StarshipService;


  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipService,
        {
          provide: getRepositoryToken(Starship),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StarshipService>(StarshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
