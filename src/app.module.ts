import { Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongoClient } from 'mongodb'; // Importa el MongoClient
import { connectToMongoDB } from './mongolico';
import { PokemonService } from './pokemon/pokemon.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [PokemonService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
  private client: MongoClient;

  async onModuleInit() {
    this.client = await connectToMongoDB();
  }

  async onApplicationShutdown() {
    if (this.client) {
      await this.client.close();
      console.log('Closed MongoDB connection');
    }
  }
}
