import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerUseCase } from './application/create-customer.usecase';
import { ListCustomersUseCase } from './application/list-customers.usecase';
import { GetCustomerUseCase } from './application/get-customer.usecase';
import { CreateCustomerDto } from './dto/create-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listCustomersUseCase: ListCustomersUseCase,
    private readonly getCustomerUseCase: GetCustomerUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou e-mail já cadastrado.' })
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomerUseCase.execute(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  async findAll() {
    return this.listCustomersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente pelo ID' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getCustomerUseCase.execute(id);
  }
}
