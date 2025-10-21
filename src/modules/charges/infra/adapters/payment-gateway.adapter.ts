export abstract class PaymentGatewayAdapter {
    abstract processPayment(
        amount: number,
        method: string,
        transactionId: string,
    ): Promise<'PAID' | 'FAILED'>;
}