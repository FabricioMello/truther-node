import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Crypto } from './Crypto';

@Entity()
export class CryptoPriceVariation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'float' })
    price!: number;

    @ManyToOne(() => Crypto, crypto => crypto.variation7d, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cryptoId' })
    crypto!: Crypto;
}