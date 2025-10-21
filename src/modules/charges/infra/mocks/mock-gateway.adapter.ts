import { Injectable } from '@nestjs/common';
import { PaymentGatewayAdapter } from '../adapters/payment-gateway.adapter';

@Injectable()
export class MockPaymentGatewayAdapter implements PaymentGatewayAdapter {
  async processPayment(
    amount: number,
    _method: string,
    _transactionId: string,
  ): Promise<'PAID' | 'FAILED'> {
    if (amount < 100) return 'PAID';
    return Math.random() > 0.5 ? 'PAID' : 'FAILED';
  }
}
