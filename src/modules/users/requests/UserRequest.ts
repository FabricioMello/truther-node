import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserRequest {
    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    name!: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsString()
    password!: string;
}