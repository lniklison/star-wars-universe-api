import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanetModule } from './planet/planet.module';
import { CharacterModule } from './character/character.module';
import { StarshipModule } from './starship/starship.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './planet/entities/planet.entity';
import { Starship } from './starship/entities/starship.entity';
import { Character } from './character/entities/character.entity';

@Module({
  imports: [PlanetModule, 
    CharacterModule, 
    StarshipModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'starWars',
      entities: [Planet, Character, Starship],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
