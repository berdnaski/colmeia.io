import { Injectable, NotFoundException } from '@nestjs/common';
import { IChargeRepository, CreateChargeData } from '../domain/charge.repository';
import { ICustomerRepository } from '../../customers/domain/customer.repository';
import { Charge } from '../domain/charge.entity';
import { PaymentGatewayAdapter } from '../infra/adapters/payment-gateway.adapter';
import { PaymentMethod } from '../domain/enums/payment-method.enum';
import { ChargeStatus } from '../domain/enums/charge-status.enum';

@Injectable()
export class CreateChargeUseCase {
  constructor(
    private readonly chargeRepository: IChargeRepository,
    private readonly customerRepository: ICustomerRepository,
    private readonly paymentGateway: PaymentGatewayAdapter,
  ) {}

  async execute(customerId: string, data: Omit<CreateChargeData, 'customerId'>): Promise<Charge> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new NotFoundException('Customer not found');

    if (data.transactionId) {
      const existingCharge = await this.chargeRepository.findByTransactionId(data.transactionId);
      if (existingCharge) return existingCharge;
    }
    
    const charge = await this.chargeRepository.create({ ...data, customerId });

    if (charge.paymentMethod !== PaymentMethod.BOLETO) {
      const gatewayStatus = await this.paymentGateway.processPayment(
        charge.amount,
        charge.paymentMethod,
        charge.id,
      );

      let status: ChargeStatus;
      if (gatewayStatus === 'PAID') status = ChargeStatus.PAID;
      else status = ChargeStatus.FAILED;

      return this.chargeRepository.updateStatus(charge.id, status);
    }

    return charge;
  }
}
