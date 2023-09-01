import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MongoClient } from 'mongodb'; // Importa MongoClient desde 'mongodb'

@Injectable()
export class PokemonService {
  async getPokemons(limit: number): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    const response = await axios.get(url);

    return response.data.results;
  }

  async insertPokemonsToDatabase(limit: number) {
    const pokemons = await this.getPokemons(limit);

    const uri = "mongodb+srv://jharoldm:t0SDvIdssmU1q3gT@pokegatos.qrspmc9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
      await client.connect();

      const database = client.db('pokegatos');
      const collection = database.collection('pokemons');

      await collection.insertMany(pokemons);

      console.log('Pokemons inserted into the database');
    } catch (error) {
      console.error('Error inserting pokemons:', error);
    } finally {
      await client.close();
    }
  }
}
