import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypto as CryptoEntity } from '../../core/models/Crypto';
import { lastValueFrom } from 'rxjs';
import { ICryptosService } from './cryptos.service.interface';

@Injectable()
export class CryptosService implements ICryptosService {
    constructor(
        @InjectRepository(CryptoEntity)
        private cryptosRepository: Repository<CryptoEntity>,
        private httpService: HttpService,
    ) {}

    async fetchAndSaveCryptoData(): Promise<void> {
        const response = await lastValueFrom(this.httpService.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,ethereum,ripple,litecoin,cardano,polkadot,binancecoin,solana,dogecoin,shiba-inu'
            },
        }));

        const searchDate = new Date();
        const cryptos = response.data.map((crypto: any) => ({
            id: crypto.id,
            marketCap: crypto.market_cap,
            variation24h: crypto.price_change_percentage_24h,
            variation7d: crypto.price_change_percentage_7d,
            allTimeHigh: crypto.ath,
            allTimeLow: crypto.atl,
            currentValue: crypto.current_price,
            searchDate: searchDate,
        }));

        for (const crypto of cryptos) {
            await this.cryptosRepository.save(crypto);
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
            where: { cryptoId: id },
            order: { searchDate: 'DESC' },
        });
    }

    async findAllByCoinGeckoId(id: string): Promise<CryptoEntity[]> {
        return this.cryptosRepository.find({
            where: { id },
            order: { searchDate: 'DESC' },
        });
    }
}