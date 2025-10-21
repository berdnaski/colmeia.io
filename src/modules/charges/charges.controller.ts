import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { CreateChargeUseCase } from './application/create-charge.usecase';
import { GetChargeUseCase } from './application/get-charge.usecase';
import { UpdateStatusUseCase } from './application/update-status.usecase';
import { CreateChargeDto } from './dto/create-charge.dto';
import { ChargeStatus } from './domain/enums/charge-status.enum';
import { ListChargesUseCase } from './application/list-charge.usecase';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateChargeStatusDto } from './dto/update-charge.dto';
import { ListCustomerChargesUseCase } from './application/list-customer-charges.usecase';

@ApiTags('Charges')
@Controller('charges')
export class ChargesController {
  constructor(
    private readonly createChargeUseCase: CreateChargeUseCase,
    private readonly listChargesUseCase: ListChargesUseCase,
    private readonly getChargeUseCase: GetChargeUseCase,
    private readonly updateStatusUseCase: UpdateStatusUseCase,
    private readonly listCustomerChargesUseCase: ListCustomerChargesUseCase
  ) {}

  @Post(':customerId/charges')
  @ApiOperation({ summary: 'Cria uma nova cobrança' })
  @ApiBody({ type: CreateChargeDto })
  @ApiResponse({ status: 201, description: 'Cobrança criada com sucesso.' })
  async create(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Body() dto: CreateChargeDto,
  ) {
    return this.createChargeUseCase.execute(customerId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as cobranças' })
  async findAll() {
    return this.listChargesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma cobrança pelo ID' })
  @ApiResponse({ status: 404, description: 'Cobrança não encontrada' })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getChargeUseCase.execute(id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Lista as cobranças de um cliente específico' })
  async findByCustomer(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
  ) {
    return this.listCustomerChargesUseCase.execute(customerId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualiza o status de uma cobrança' })
  @ApiBody({ type: UpdateChargeStatusDto })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso.' })
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateChargeStatusDto,
  ) {
    return this.updateStatusUseCase.execute(id, body.status);
  }
}
