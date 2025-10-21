import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerUsecase } from './application/create-customer.usecase';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUsecase) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomerUseCase.execute(createCustomerDto);
  }
}
