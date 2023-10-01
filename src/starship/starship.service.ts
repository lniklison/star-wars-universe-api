import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMessages } from '../helpers/errorMessages';
import { PlanetService } from '../planet/planet.service';
import { Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { Planet } from 'src/planet/entities/planet.entity';

@Injectable()
export class StarshipService {

  constructor(
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    private readonly planetService: PlanetService
  ) {}

  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    const newStarship = this.starshipRepository.create(createStarshipDto);
    return await this.starshipRepository.save(newStarship);
  }

  async findAll(): Promise<Starship[]> {
    return await this.starshipRepository.find();
  }

  async findOne(id: number): Promise<Starship> {
    return await this.starshipRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto): Promise<Starship> {
    await this.starshipRepository.update(id, updateStarshipDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.starshipRepository.delete(id);
  }

  async calculateDistance(id: number, planetId: number): Promise<number> {
    const starship = await this.starshipRepository.findOne({ where: { id: id } });
    const planet = await this.planetService.findOne(planetId);

    if (!starship) {
      throw new NotFoundException(ErrorMessages.STARSHIP_NOT_FOUND);
    }

    if (!planet) {
      throw new NotFoundException(ErrorMessages.PLANET_NOT_FOUND);
    }

    var distance = this.calculateDistanceBetweenCoordinates(starship.currentLocation, planet.coordinates);

    return distance;
  }
  
  private calculateDistanceBetweenCoordinates(coord1: { latitude: number; longitude: number; }, coord2: { latitude: number; longitude: number; }): number {
    const R = 6371;
    
    const deg2rad = (degree: number): number => {
        return degree * (Math.PI/180);
    };

    const dLat = deg2rad(coord2.latitude - coord1.latitude);
    const dLon = deg2rad(coord2.longitude - coord1.longitude);
    
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(coord1.latitude)) * Math.cos(deg2rad(coord2.latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    
    return distance;
  }

  async spawnEnemyStarship(starshipId: number): Promise<Starship> {
    
    let starship = await this.starshipRepository.findOne({ where: { id: starshipId } });
    if (!starship) {
        throw new Error(ErrorMessages.STARSHIP_NOT_FOUND);
    }

    let enemyStarship = await this.generateRandomStarship();
    
    starship.enemies.push(enemyStarship);

    return this.starshipRepository.save(starship);
  }
  
  private async generateRandomStarship(): Promise<Starship> {
    
    const starshipName = this.generateRandomStarshipName();
    const starshipModel = this.generateRandomStarshipModel();
    const starshipCargoCapacity = this.generateRandomCargoCapacity();
    const starshipCurrentLocation = this.generateRandomCoordinates();

    const starship = new Starship(starshipName, starshipModel, starshipCargoCapacity, starshipCurrentLocation);
    await this.starshipRepository.save(starship);
    return starship;
  }

  private generateRandomStarshipName(): string {
      const names = ["Falcon", "Destroyer", "Cruiser", "Voyager", "Explorer"];
      const randomIndex = Math.floor(Math.random() * names.length);
      return names[randomIndex];
  }

  private generateRandomStarshipModel(): string {
      const models = ["Model A", "Model B", "Model C", "Model D", "Model E"];
      const randomIndex = Math.floor(Math.random() * models.length);
      return models[randomIndex];
  }

  private generateRandomCargoCapacity(): number {
      return Math.floor(Math.random() * 10000);
  }

  private generateRandomCoordinates(): { latitude: number; longitude: number; } {
    const latitude = (Math.random() * 180) - 90;
    const longitude = (Math.random() * 360) - 180;

    return {
        latitude: parseFloat(latitude.toFixed(6)),
        longitude: parseFloat(longitude.toFixed(6))
    };
  }

  public async getNearbyEnemies(id: number, range: number): Promise<Starship[]> {
    const starship = await this.starshipRepository.findOne({ where: { id: id } });
    if (!starship) {
        throw new Error(ErrorMessages.STARSHIP_NOT_FOUND);
    }

    let nearbyEnemies: Starship[] = [];
    starship.enemies.forEach(enemy => {
      if(this.calculateDistanceBetweenCoordinates(starship.currentLocation, enemy.currentLocation) < range)
        nearbyEnemies.push(enemy);
    });

    return nearbyEnemies;
  }

  async getReachablePlanets(starshipId: number): Promise<Planet[]> {
    const starship = await this.starshipRepository.findOne({ where: { id: starshipId } });

    if (!starship) {
      throw new NotFoundException(ErrorMessages.STARSHIP_NOT_FOUND);
    }

    const allPlanets = await this.planetService.findAll();

    const reachablePlanets = allPlanets.filter(planet => {
      const distance = this.calculateDistanceBetweenCoordinates(starship.currentLocation, planet.coordinates);
      return distance <= starship.autonomy;
    });

    return reachablePlanets;
  }
}
