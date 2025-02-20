import {Controller, Get, Post, Param, Inject, Body} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ICryptosService } from './cryptos.service.interface';
import { Crypto as CryptoEntity } from '../../core/models/Crypto';
import {FetchCryptoRequest} from "./requests/FetchCryptoRequest";

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
    async fetchAndSaveCryptoData(@Body() fetchCryptoRequest: FetchCryptoRequest): Promise<void> {
        return this.cryptosService.fetchAndSaveCryptoData(fetchCryptoRequest.ids);
    }

    @ApiOperation({ summary: 'Get all cryptos' })
    @ApiResponse({ status: 200, description: 'Return all cryptos.' })
    @Get()
    async findAll(): Promise<CryptoEntity[]> {
        return this.cryptosService.findAll();
    }


    @ApiOperation({ summary: 'Get all cryptos by CoinGecko ID' })
    @ApiResponse({ status: 200, description: 'Return all cryptos by CoinGecko ID.' })
    @Get(':cryptoId')
    async findAllByCoinGeckoId(@Param('cryptoId') id: string): Promise<CryptoEntity | null> {
        return this.cryptosService.findByCoinGeckoId(id);
    }
}