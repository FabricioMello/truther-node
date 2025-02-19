import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypto as CryptoEntity } from '../../core/models/Crypto';
import { lastValueFrom } from 'rxjs';
import { ICryptosService } from './cryptos.service.interface';
import { CryptoPriceVariation } from '../../core/models/CryptoPriceVariation';

@Injectable()
export class CryptosService implements ICryptosService {
    constructor(
        @Inject(getRepositoryToken(CryptoEntity))
        private cryptosRepository: Repository<CryptoEntity>,
        @Inject(getRepositoryToken(CryptoPriceVariation))
        private priceVariationRepository: Repository<CryptoPriceVariation>,
        private httpService: HttpService,
    ) {}

    async fetchAndSaveCryptoData(ids: string[]): Promise<void> {
        const response = await lastValueFrom(this.httpService.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                ids: ids.join(','),
                sparkline: true
            },
        }));

        if (!response.data || response.data.length === 0) {
            throw new BadRequestException('No data returned from the API');
        }

        const searchDate = new Date();
        if (isNaN(searchDate.getTime())) {
            throw new BadRequestException('Invalid search date');
        }

        for (const cryptoData of response.data) {
            const priceVariations = cryptoData.sparkline_in_7d.price.map((price: number) => {
                return this.priceVariationRepository.create({ price });
            });

            const crypto = this.cryptosRepository.create({
                cryptoId: cryptoData.id,
                marketCap: cryptoData.market_cap,
                variation24h: cryptoData.price_change_percentage_24h,
                variation7d: cryptoData.price_change_percentage_7d,
                allTimeHigh: cryptoData.ath,
                allTimeLow: cryptoData.atl,
                currentValue: cryptoData.current_price,
                searchDate: searchDate,
                priceVariations: priceVariations,
            });

            await this.cryptosRepository.upsert(crypto, ['cryptoId']);
        }
    }

    async findAll(): Promise<CryptoEntity[]> {
        const subQuery = this.cryptosRepository.createQueryBuilder('crypto')
            .select('MAX(crypto.searchDate)', 'maxDate')
            .addSelect('crypto.id', 'id')
            .groupBy('crypto.id');

        const query = this.cryptosRepository.createQueryBuilder('crypto')
            .innerJoin(
                `(${subQuery.getQuery()})`,
                'sub',
                'crypto.id = sub.id AND crypto.searchDate = sub.maxDate'
            )
            .orderBy('crypto.id');

        return query.getMany();
    }

    findOne(id: string): Promise<CryptoEntity | null> {
        return this.cryptosRepository.findOne({
            where: { id: id },
            relations: ['priceVariations'],
            order: { searchDate: 'DESC' },
        });
    }

    async findAllByCoinGeckoId(id: string): Promise<CryptoEntity[]> {
        return this.cryptosRepository.find({
            where: { cryptoId: id },
            relations: ['priceVariations'],
            order: { searchDate: 'DESC' },
        });
    }
}