import { Test, TestingModule } from '@nestjs/testing';
import { CryptosController } from '../modules/cryptos/cryptos.controller';
import { CryptosService } from '../modules/cryptos/cryptos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crypto } from '../core/models/Crypto';
import { CryptoPriceVariation } from '../core/models/CryptoPriceVariation';
import { Repository } from 'typeorm';
import { HttpModule } from '@nestjs/axios';

describe('CryptosController', () => {
  let controller: CryptosController;
  let service: CryptosService;

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
        {
          provide: getRepositoryToken(CryptoPriceVariation),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CryptosController>(CryptosController);
    service = module.get<CryptosService>(CryptosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cryptos', async () => {
    const cryptos = [{
      id: '97aa4223-ab4f-490c-9934-35a4ab63a4b6',
      cryptoId: 'bitcoin',
      marketCap: 1000,
      variation24h: 1,
      variation7d: 2,
      allTimeHigh: 50000,
      allTimeLow: 3000,
      currentValue: 45000,
      searchDate: new Date(),
      priceVariations: []
    }];
    jest.spyOn(service, 'findAll').mockResolvedValue(cryptos);
    const result = await controller.findAll();
    expect(result).toEqual(cryptos);
  });

  it('should return a single crypto by ID', async () => {
    const crypto = {
      id: '97aa4223-ab4f-490c-9934-35a4ab63a4b6',
      cryptoId: 'bitcoin',
      marketCap: 1000,
      variation24h: 1,
      variation7d: 2,
      allTimeHigh: 50000,
      allTimeLow: 3000,
      currentValue: 45000,
      searchDate: new Date(),
      priceVariations: []
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(crypto);
    const result = await controller.findOne('97aa4223-ab4f-490c-9934-35a4ab63a4b6');
    expect(result).toEqual(crypto);
  });

  it('should fetch and save crypto data', async () => {
    const fetchAndSaveCryptoDataSpy = jest.spyOn(service, 'fetchAndSaveCryptoData').mockResolvedValue();
    const request = { ids: ['bitcoin', 'ethereum'] };
    await controller.fetchAndSaveCryptoData(request);
    expect(fetchAndSaveCryptoDataSpy).toHaveBeenCalledWith(request.ids);
  });

  it('should save price variations correctly', async () => {
    const cryptoData = {
      id: 'bitcoin',
      market_cap: 1000,
      price_change_percentage_24h: 1,
      price_change_percentage_7d: 2,
      ath: 50000,
      atl: 3000,
      current_price: 45000,
      sparkline_in_7d: {
        price: [0.25477780730384486, 0.2513851169405121, 0.25017959137438445]
      }
    };

    jest.spyOn(service, 'fetchAndSaveCryptoData').mockResolvedValue();

    const request = { ids: ['bitcoin', 'ethereum'] };
    await controller.fetchAndSaveCryptoData(request);

    expect(service.fetchAndSaveCryptoData).toHaveBeenCalledWith(request.ids);
  });
});