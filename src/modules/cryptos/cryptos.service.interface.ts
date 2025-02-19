import {Crypto as CryptoEntity} from "../../core/models/Crypto";

export interface ICryptosService {
    fetchAndSaveCryptoData(ids: string[]): Promise<void>;
    findAll(): Promise<CryptoEntity[]>;
    findOne(id: string): Promise<CryptoEntity | null>;
    findAllByCoinGeckoId(id: string): Promise<CryptoEntity[]>;
}