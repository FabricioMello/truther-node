import { Test, TestingModule } from '@nestjs/testing';
import { CryptosService } from '../modules/cryptos/cryptos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crypto } from '../core/models/Crypto';
import { Repository } from 'typeorm';
import { HttpModule } from '@nestjs/axios';

describe('CryptosService', () => {
  let service: CryptosService;
  let repository: Repository<Crypto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CryptosService,
        {
          provide: getRepositoryToken(Crypto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CryptosService>(CryptosService);
    repository = module.get<Repository<Crypto>>(getRepositoryToken(Crypto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});