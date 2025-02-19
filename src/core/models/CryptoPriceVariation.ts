import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Crypto } from './Crypto';

@Entity()
export class CryptoPriceVariation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'float' })
    price!: number;

    @ManyToOne(() => Crypto, crypto => crypto.priceVariations, { onDelete: 'CASCADE' })
    crypto!: Crypto;
}