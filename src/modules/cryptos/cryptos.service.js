"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptosService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Crypto_1 = require("../../core/models/Crypto");
const rxjs_1 = require("rxjs");
let CryptosService = class CryptosService {
    constructor(cryptosRepository, httpService) {
        this.cryptosRepository = cryptosRepository;
        this.httpService = httpService;
    }
    fetchAndSaveCryptoData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, rxjs_1.lastValueFrom)(this.httpService.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: { vs_currency: 'usd' },
            }));
            const cryptos = response.data.map((crypto) => ({
                marketCap: crypto.market_cap,
                variation24h: crypto.price_change_percentage_24h,
                variation7d: crypto.price_change_percentage_7d,
                allTimeHigh: crypto.ath,
                allTimeLow: crypto.atl,
                currentValue: crypto.current_price,
            }));
            yield this.cryptosRepository.save(cryptos);
        });
    }
    findAll() {
        return this.cryptosRepository.find();
    }
    findOne(id) {
        return this.cryptosRepository.findOneBy({ id });
    }
};
exports.CryptosService = CryptosService;
exports.CryptosService = CryptosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Crypto_1.Crypto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], CryptosService);
