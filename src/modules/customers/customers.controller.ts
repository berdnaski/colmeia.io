import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateCustomerUsecase } from './application/create-customer.usecase';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ListCustomersUseCase } from './application/list-customers.usecase';
import { GetCustomerUseCase } from './application/get-customer.usecase';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUsecase,
    private readonly listCustomersUseCase: ListCustomersUseCase,
    private readonly getCustomerUseCase: GetCustomerUseCase,
  ) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomerUseCase.execute(createCustomerDto);
  }

  @Get()
  async findAll() {
    return this.listCustomersUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getCustomerUseCase.execute(id);
  }
}
