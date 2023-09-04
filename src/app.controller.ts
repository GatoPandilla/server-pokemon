import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PokemonService } from './pokemon/pokemon.service';

@Controller('pokemon')
@ApiTags('pokemons')
export class AppController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemons(@Query('limit') limit: number = 20) {
    const data = await this.pokemonService.getPokemons(limit);
    return data;
  }

  @Get('insert')
  async insertPokemons(@Query('limit') limit: number = 20) {
    await this.pokemonService.insertPokemonsToDatabase(limit);
    return 'Pokemons inserted into the database';
  }
}
