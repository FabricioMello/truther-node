import { Controller, Get, Post, Param, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ICryptosService } from './cryptos.service.interface';
import { Crypto as CryptoEntity } from '../../core/models/Crypto';

@ApiTags('cryptos')
@Controller('cryptos')
export class CryptosController {
    constructor(
        @Inject('ICryptosService')
        private readonly cryptosService: ICryptosService,
    ) {}

    @ApiOperation({ summary: 'Fetch and save crypto data' })
    @ApiResponse({ status: 201, description: 'The crypto data has been successfully fetched and saved.' })
    @Post('fetch')
    async fetchAndSaveCryptoData(): Promise<void> {
        return this.cryptosService.fetchAndSaveCryptoData();
    }

    @ApiOperation({ summary: 'Get all cryptos' })
    @ApiResponse({ status: 200, description: 'Return all cryptos.' })
    @Get()
    async findAll(): Promise<CryptoEntity[]> {
        return this.cryptosService.findAll();
    }

    @ApiOperation({ summary: 'Get a crypto by ID' })
    @ApiResponse({ status: 200, description: 'Return a single crypto.' })
    @Get(':id')
    async findOneById(@Param('id') id: string): Promise<CryptoEntity | null> {
        return this.cryptosService.findOne(id);
    }

    @ApiOperation({ summary: 'Get all cryptos by CoinGecko ID' })
    @ApiResponse({ status: 200, description: 'Return all cryptos by CoinGecko ID.' })
    @Get('coingecko/:cryptoId')
    async findAllByCoinGeckoId(@Param('cryptoId') id: string): Promise<CryptoEntity[]> {
        return this.cryptosService.findAllByCoinGeckoId(id);
    }
}