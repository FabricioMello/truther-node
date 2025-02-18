import { Test, TestingModule } from '@nestjs/testing';
import { CryptosController } from '../modules/cryptos/cryptos.controller';
import { CryptosService } from '../modules/cryptos/cryptos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crypto } from '../core/models/Crypto';
import { Repository } from 'typeorm';
import { HttpModule } from '@nestjs/axios';

describe('CryptosController', () => {
  let controller: CryptosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CryptosController],
      providers: [
        CryptosService,
        {
          provide: getRepositoryToken(Crypto),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CryptosController>(CryptosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});