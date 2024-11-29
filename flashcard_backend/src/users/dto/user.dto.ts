import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Indicates whether the user has admin privileges' })
  @IsBoolean()
  @IsOptional()
  admin?: boolean = false;
}

