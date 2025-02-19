import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class FetchCryptoRequest {
  @ApiProperty({
    description: 'List of cryptocurrency IDs',
    example: ['bitcoin', 'ethereum', 'ripple'],
  })
  @IsArray()
  @IsString({ each: true })
  ids!: string[];
}
