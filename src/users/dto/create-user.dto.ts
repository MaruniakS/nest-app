import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
