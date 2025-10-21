import { IsEnum } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChargeStatus } from '../domain/enums/charge-status.enum';

export class UpdateChargeStatusDto {
  @ApiProperty({ description: 'Novo status da cobrança', enum: ChargeStatus })
  @IsEnum(ChargeStatus)
  status: ChargeStatus;
}
