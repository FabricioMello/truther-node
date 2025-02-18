import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/models/User';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: ['IUserService'],
})
export class UserModule {}
