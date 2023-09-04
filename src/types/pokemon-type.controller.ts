/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { MongoClient } from 'mongodb';

@Controller('pokemon-type')
export class PokemonTypeController {
  @Get()
  async getPokemonTypes() {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type/');
      const types = response.data.results.map((type: { name: string }) => ({
        name: type.name,
      }));

      const uri = process.env.URL;
      const client = new MongoClient(uri);

      await client.connect();
      const db = client.db();
      const collection = db.collection('pokemonTypes');

      for (const type of types) {
        const existingType = await collection.findOne({ name: type.name });

        if (!existingType) {
          await collection.insertOne(type);
        }
      }
      await client.close();

      return types;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
