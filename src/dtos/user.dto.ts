import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

export class UserDto {
    @ApiProperty({ example: 'John Doe' })
    name!: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email!: string;

    @ApiProperty({ example: UserRole.CLIENTE, enum: UserRole, default: UserRole.CLIENTE })
    role!: string;
}