import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/users.module';
import { CryptosModule } from './modules/cryptos/cryptos.module';
import { User } from './core/models/User';
import { Crypto } from './core/models/Crypto';
import {CryptoPriceVariation} from "./core/models/CryptoPriceVariation";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'truther',
            entities: [User, Crypto, CryptoPriceVariation],
            synchronize: true,
        }),
        UserModule,
        CryptosModule,
    ],
})
export class AppModule {}