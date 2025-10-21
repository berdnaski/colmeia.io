import { Module } from '@nestjs/common';
import { ChargesController } from './charges.controller';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { PrismaChargeRepository } from './infra/prisma-charge.repository';
import { IChargeRepository } from './domain/charge.repository';
import { CreateChargeUseCase } from './application/create-charge.usecase';
import { GetChargeUseCase } from './application/get-charge.usecase';
import { UpdateStatusUseCase } from './application/update-status.usecase';
import { MockPaymentGatewayAdapter } from './infra/mocks/mock-gateway.adapter';
import { ListChargesUseCase } from './application/list-charge.usecase';
import { PaymentGatewayAdapter } from './infra/adapters/payment-gateway.adapter';
import { CustomersModule } from '../customers/customers.module';
import { ListCustomerChargesUseCase } from './application/list-customer-charges.usecase';

@Module({
  imports: [CustomersModule],
  controllers: [ChargesController],
  providers: [
    PrismaService,
    CreateChargeUseCase,
    ListChargesUseCase,
    GetChargeUseCase,
    UpdateStatusUseCase,
    ListCustomerChargesUseCase,
    {
      provide: IChargeRepository,
      useClass: PrismaChargeRepository,
    },
    {
      provide: PaymentGatewayAdapter,
      useClass: MockPaymentGatewayAdapter,
    },
  ],
})
export class ChargesModule {}
