import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Nome completo do cliente', example: 'Erick Berdnaski' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'E-mail do cliente', example: 'erick@example.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Documento (CPF) do cliente', minLength: 11, maxLength: 11, example: '12345678901' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  @MinLength(11)
  document: string;

  @ApiProperty({ description: 'Telefone do cliente', example: '+5511999999999', required: false })
  @IsString()
  phone?: string;
}
