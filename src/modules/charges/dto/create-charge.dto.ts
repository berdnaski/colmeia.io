import { 
  IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min, MinDate, ValidateIf 
} from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from "../domain/enums/payment-method.enum";
import { Type } from "class-transformer";

export class CreateChargeDto {
  @ApiProperty({ description: 'Valor da cobrança', minimum: 0.01, example: 100.50 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiPropertyOptional({ description: 'Moeda da cobrança', example: 'BRL', default: 'BRL' })
  @IsOptional()
  @IsString()
  currency?: string;
  
  @ApiProperty({ description: 'Método de pagamento', enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
  
  @ApiPropertyOptional({ description: 'Número de parcelas para cartão de crédito', minimum: 1, maximum: 12, example: 3 })
  @ValidateIf(o => o.paymentMethod === PaymentMethod.CREDIT_CARD)
  @IsNumber()
  @Min(1)
  @Max(12)
  installments?: number;
  
  @ApiPropertyOptional({ description: 'Data de vencimento do boleto', type: String, format: 'date-time', example: '2025-12-01T00:00:00Z' })
  @ValidateIf(o => o.paymentMethod === PaymentMethod.BOLETO)
  @Type(() => Date) 
  @IsDate()
  dueDate?: Date;

  @ApiPropertyOptional({ description: 'ID de transação para idempotência', example: 'txn_123456789' })
  @IsOptional()
  @IsString()
  transactionId?: string;
}
