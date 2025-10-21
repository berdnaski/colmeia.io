import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ICustomerRepository } from '../domain/customer.repository';

@Injectable()
export class CreateCustomerUsecase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(createCustomerDto: CreateCustomerDto) {
    const { email } = createCustomerDto;
    const existingCustomer = await this.customerRepository.findByEmail(email);

    if (existingCustomer) {
      throw new BadRequestException('Email already in use');
    }

    return this.customerRepository.create(createCustomerDto);
  }
}
