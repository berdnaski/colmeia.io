import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { PrismaCustomerRepository } from './infra/prisma-customer.repository';
import { CreateCustomerUseCase } from './application/create-customer.usecase';
import { ICustomerRepository } from './domain/customer.repository';
import { ListCustomersUseCase } from './application/list-customers.usecase';
import { GetCustomerUseCase } from './application/get-customer.usecase';

@Module({
  controllers: [CustomersController],
  providers: [
    PrismaService,
    CreateCustomerUseCase,
    ListCustomersUseCase,
    GetCustomerUseCase,
    {
      provide: ICustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  exports: [
    ICustomerRepository,
  ]
})
export class CustomersModule {}
