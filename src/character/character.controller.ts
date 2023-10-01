import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('character')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @ApiOperation({ summary: 'Create a new character' })
  @ApiResponse({ status: 201, description: 'Character created successfully.' })
  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return await this.characterService.create(createCharacterDto);
  }

  @ApiOperation({ summary: 'Get all characters' })
  @ApiResponse({ status: 200, description: 'List of all characters.' })
  @Get()
  async findAll() {
    return await this.characterService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific character by ID' })
  @ApiResponse({ status: 200, description: 'Character data.' })
  @ApiParam({ name: 'id', type: String, description: 'Character ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.characterService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update character details by ID' })
  @ApiResponse({ status: 200, description: 'Character updated successfully.' })
  @ApiParam({ name: 'id', type: String, description: 'Character ID' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return await this.characterService.update(+id, updateCharacterDto);
  }

  @ApiOperation({ summary: 'Delete a character by ID' })
  @ApiResponse({ status: 200, description: 'Character deleted successfully.' })
  @ApiParam({ name: 'id', type: String, description: 'Character ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.characterService.remove(+id);
  }

  @ApiOperation({ summary: 'Relocate character to a planet' })
  @ApiResponse({ status: 200, description: 'Character relocated successfully.' })
  @ApiParam({ name: 'id', type: String, description: 'Character ID' })
  @Put(':id/planet')
  async relocate(@Param('id') id: string, @Body()relocateDto: { planetId: number }) {
    try{
      return await this.characterService.relocateCharacter(+id, +relocateDto.planetId);
    }
    catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Board character onto a ship' })
  @ApiResponse({ status: 200, description: 'Character boarded successfully.' })
  @ApiParam({ name: 'id', type: String, description: 'Character ID' })
  @Put(':id/board')
  async boardShip(@Param('id') id: string, @Body() shipId: number) {
    try{
      return await this.characterService.boardStarship(+id, shipId);
    } 
    catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Disembark character from a ship' })
  @ApiResponse({ status: 200, description: 'Character disembarked successfully.' })
  @ApiParam({ name: 'id', type: String, description: 'Character ID' })
  @Put(':id/disembark')
  async disembarkShip(@Param('id') id: string) {
    try{
      return await this.characterService.disembarkStarship(+id);
    } catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
