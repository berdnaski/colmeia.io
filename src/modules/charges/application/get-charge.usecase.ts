import { Injectable } from '@nestjs/common';
import { IChargeRepository } from '../domain/charge.repository';

@Injectable()
export class GetChargeUseCase {
  constructor(private readonly chargeRepository: IChargeRepository) {}

  async execute(id: string) {
    return this.chargeRepository.findById(id);
  }
}
