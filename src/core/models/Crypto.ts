import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { CryptoPriceVariation } from './CryptoPriceVariation';

@Entity()
@Unique(['cryptoId'])
export class Crypto {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    cryptoId!: string;

    @Column({ type: 'bigint', default: 0 })
    marketCap!: number;

    @Column({ type: 'float', default: 0 })
    variation24h!: number;

    @Column({ type: 'float', default: 0 })
    variation7d!: number;

    @Column({ type: 'float', default: 0 })
    allTimeHigh!: number;

    @Column({ type: 'float', default: 0 })
    allTimeLow!: number;

    @Column({ type: 'float', default: 0 })
    currentValue!: number;

    @Column()
    searchDate!: Date;

    @OneToMany(() => CryptoPriceVariation, priceVariation => priceVariation.crypto, { cascade: true, onDelete: 'CASCADE' })
    priceVariations!: CryptoPriceVariation[];
}