import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipController } from './starship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { PlanetModule } from 'src/planet/planet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Starship]), PlanetModule],
  controllers: [StarshipController],
  providers: [StarshipService],
  exports: [StarshipService]
})
export class StarshipModule {}
