import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('planet')
@Controller('planet')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new planet' })
  @ApiBody({ type: CreatePlanetDto })
  @ApiResponse({ status: 201, description: 'Planet successfully created.' })
  async create(@Body() createPlanetDto: CreatePlanetDto): Promise<any> {
    return await this.planetService.create(createPlanetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all planets' })
  @ApiResponse({ status: 200, description: 'List of all planets.' })
  async findAll() {
    return await this.planetService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a planet by ID' })
  @ApiParam({ name: 'id', description: 'ID of the planet to retrieve' })
  async findOne(@Param('id') id: string) {
    return await this.planetService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a planet by ID' })
  @ApiParam({ name: 'id', description: 'ID of the planet to update' })
  @ApiBody({ type: UpdatePlanetDto })
  async update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
    return await this.planetService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a planet by ID' })
  @ApiParam({ name: 'id', description: 'ID of the planet to delete' })
  async remove(@Param('id') id: string) {
    return await this.planetService.remove(+id);
  }
}
