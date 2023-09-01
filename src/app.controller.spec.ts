import { Test, TestingModule } from '@nestjs/testing';
import { AppControllera } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppControllera;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppControllera],
      providers: [AppService],
    }).compile();

    appController = app.get<AppControllera>(AppControllera);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
