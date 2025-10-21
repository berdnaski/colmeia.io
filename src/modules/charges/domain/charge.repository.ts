import { Charge } from './charge.entity';
import { ChargeStatus } from './enums/charge-status.enum';
import { PaymentMethod } from './enums/payment-method.enum';

export type CreateChargeData = {
  customerId: string;
  amount: number;
  currency?: string;
  paymentMethod: PaymentMethod;
  installments?: number;
  dueDate?: Date;
  transactionId?: string;
};

export abstract class IChargeRepository {
  abstract create(data: CreateChargeData): Promise<Charge>;
  abstract findById(id: string): Promise<Charge | null>;
  abstract listAll(): Promise<Charge[]>;
  abstract updateStatus(id: string, status: ChargeStatus): Promise<Charge>;
  abstract findByCustomerId(customerId: string): Promise<Charge[]>;
  abstract findByTransactionId(transactionId: string): Promise<Charge | null>;
}
