import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetService {

  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
  ) {}


  async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return await this.planetRepository.save(createPlanetDto);
  }

  async findAll(): Promise<Planet[]> {
    return await this.planetRepository.find();
  }

  async findOne(id: number): Promise<Planet> {
    const planet = await this.planetRepository.findOne({ where: { id: id } });
    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    const planet = await this.planetRepository.preload({
      id: id,
      ...updatePlanetDto,
    });
    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
    return await this.planetRepository.save(planet);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.planetRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
  }
}
