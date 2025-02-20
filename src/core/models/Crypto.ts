import {Entity, Column, OneToMany, Index, PrimaryColumn} from 'typeorm';
import { CryptoPriceVariation } from './CryptoPriceVariation';

@Entity()
@Index(['cryptoId'], { unique: true })
export class Crypto {

    @PrimaryColumn()
    cryptoId!: string;

    @Column({ type: 'bigint', default: 0 })
    marketCap!: number;

    @Column({ type: 'float', default: 0 })
    variation24h!: number;

    @Column({ type: 'float', default: 0 })
    allTimeHigh!: number;

    @Column({ type: 'float', default: 0 })
    allTimeLow!: number;

    @Column({ type: 'float', default: 0 })
    currentValue!: number;

    @Column()
    searchDate!: Date;

    @OneToMany(() => CryptoPriceVariation, priceVariation => priceVariation.crypto, {
        cascade: ["insert", "update"],
        onDelete: 'CASCADE'
    })
    variation7d!: CryptoPriceVariation[];
}