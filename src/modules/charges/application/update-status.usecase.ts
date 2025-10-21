import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IChargeRepository } from '../domain/charge.repository';
import { ChargeStatus } from '../domain/enums/charge-status.enum';

@Injectable()
export class UpdateStatusUseCase {
  constructor(private readonly chargeRepository: IChargeRepository) {}

  async execute(id: string, status: ChargeStatus) {
    const charge = await this.chargeRepository.findById(id);

    if (!charge) throw new NotFoundException('Charge not found');

    if (charge.status === ChargeStatus.EXPIRED) {
        throw new BadRequestException(
            'Cannot update the status of an expired charge.'
        )
    }

    if (charge.status === ChargeStatus.PAID && status === ChargeStatus.PENDING) {
        throw new BadRequestException(
            'Cannot revert a paid charge to pending.'
        )
    }

    return this.chargeRepository.updateStatus(id, status);
  }
}
