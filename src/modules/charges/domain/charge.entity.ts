import { ChargeStatus } from "./enums/charge-status.enum";
import { PaymentMethod } from "./enums/payment-method.enum";

export class Charge {
  constructor(
    public readonly id: string,
    public customerId: string,
    public amount: number,
    public currency: string = 'BRL',
    public paymentMethod: PaymentMethod,
    public status: ChargeStatus = ChargeStatus.PENDING,
    public installments?: number,
    public dueDate?: Date,
    public transactionId?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
