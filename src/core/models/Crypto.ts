import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['cryptoId', 'searchDate'])
export class Crypto {
    @PrimaryGeneratedColumn('uuid')
    cryptoId!: string;

    @Column()
    id!: string;

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
}