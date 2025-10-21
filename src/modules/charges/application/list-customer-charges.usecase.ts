import { Injectable } from "@nestjs/common";
import { IChargeRepository } from "../domain/charge.repository";

@Injectable()
export class ListCustomerChargesUseCase {
  constructor(private readonly chargeRepository: IChargeRepository) {}

  async execute(customerId: string) {
    const charges = await this.chargeRepository.findByCustomerId(customerId);

    if (charges.length === 0) {
      return { message: 'Nenhuma cobrança encontrada para este cliente.' };
    }

    return charges;
  }
}
