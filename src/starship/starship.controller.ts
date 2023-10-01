import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Starships')  // Swagger documentation grouping
@Controller('starship')
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @ApiOperation({ summary: 'Create a new starship' })
  @ApiResponse({ status: 201, description: 'Starship created successfully.' })
  @Post()
  async create(@Body() createStarshipDto: CreateStarshipDto) {
    return await this.starshipService.create(createStarshipDto);
  }

  @ApiOperation({ summary: 'Retrieve all starships' })
  @Get()
  async findAll() {
    return await this.starshipService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a specific starship by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.starshipService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a specific starship by ID' })
  @Patch(':id')
  async update( @Param('id') id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return await this.starshipService.update(+id, updateStarshipDto);
  }

  @ApiOperation({ summary: 'Delete a specific starship by ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.starshipService.remove(+id);
  }

  @ApiOperation({ summary: 'Calculate distance between starship and a specific planet' })
  @Get(':id/distance/:planetId')
  async calculateDistance(@Param('id') id: string, @Param('planetId') planetId: string) {
    try {
      return await this.starshipService.calculateDistance(+id, +planetId);
    }
    catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Retrieve enemies near a specific starship within a given range' })
  @Get(':id/enemies/:range')
  async getNearbyEnemies(@Param('id') id: string, @Param('range') range: string) {
    try {
      return await this.starshipService.getNearbyEnemies(+id, +range);
    }
    catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Generate a random enemy for a specific starship' })
  @Post(':id/generateEnemy')
  async generateRandomEnemy(@Param('id') id: string) {
    try {
      return await this.starshipService.spawnEnemyStarship(+id);
    }
    catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Retrieve planets reachable by a specific starship' })
  @Get(':id/reachablePlanets')
  async getReachablePlanets(@Param('id') id: string) {
    try {
      return await this.starshipService.getReachablePlanets(+id);
    }
    catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
