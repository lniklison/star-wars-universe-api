import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { PlanetModule } from 'src/planet/planet.module';
import { StarshipModule } from 'src/starship/starship.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), PlanetModule, StarshipModule],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
