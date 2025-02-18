import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/users.module';
import { CryptosModule } from './modules/cryptos/cryptos.module';
import { User } from './core/models/User';
import { Crypto } from './core/models/Crypto';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql', // ou o tipo de banco de dados que você está usando
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'truther',
            entities: [User, Crypto],
            synchronize: true,
        }),
        UserModule,
        CryptosModule,
    ],
})
export class AppModule {}