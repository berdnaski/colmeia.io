import { Injectable } from '@nestjs/common';
import { IChargeRepository } from '../domain/charge.repository';

@Injectable()
export class ListChargesUseCase {
  constructor(private readonly chargeRepository: IChargeRepository) {}

  async execute() {
    return this.chargeRepository.listAll();
  }
}
