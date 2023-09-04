/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MongoClient } from 'mongodb';

@Injectable()
export class PokemonService {
  async getPokemons(limit: number): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    const response = await axios.get(url);

    return response.data.results;
  }

  async insertPokemonsToDatabase(limit: number) {
    const pokemons = await this.getPokemons(limit);

    const uri = process.env.URL;
    const client = new MongoClient(uri);

    try {
      await client.connect();

      const database = client.db('pokegatos');
      const collection = database.collection('pokemons');

      const distinctNames = await collection.distinct('name');

      const filteredPokemons = pokemons.filter((pokemon) => {
        return !distinctNames.includes(pokemon.name);
      });

      await collection.insertMany(filteredPokemons);

      console.log('Pokemons inserted into the database');
    } catch (error) {
      console.error('Error inserting pokemons:', error);
    } finally {
      await client.close();
    }
  }

  async getAllPokemons(): Promise<any[]> {
    const uri = process.env.URL;
    const client = new MongoClient(uri);

    try {
      await client.connect();

      const database = client.db('pokegatos');
      const collection = database.collection('pokemons');

      const dbPokemons = await collection.find().toArray();

      const limit = 1010;
      const apiPokemons = await this.getPokemons(limit);

      const allPokemons = [...dbPokemons, ...apiPokemons];

      return allPokemons;
    } catch (error) {
      console.error('Error obteniendo todos los Pokémon:', error);
      throw error;
    } finally {
      await client.close();
    }
  }
}
