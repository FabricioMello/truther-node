import {Crypto as CryptoEntity} from "../../core/models/Crypto";

export interface ICryptosService {
    fetchAndSaveCryptoData(ids: string[]): Promise<void>;
    findAll(): Promise<CryptoEntity[]>;
    findByCoinGeckoId(id: string): Promise<CryptoEntity | null>;
}