import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptosService } from './cryptos.service';
import { CryptosController } from './cryptos.controller';
import { Crypto } from '../../core/models/Crypto';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto]), HttpModule],
  providers: [
    {
      provide: 'ICryptosService',
      useClass: CryptosService,
    },
  ],
  controllers: [CryptosController],
})
export class CryptosModule {}