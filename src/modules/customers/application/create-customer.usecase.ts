import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ICustomerRepository } from '../domain/customer.repository';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(createCustomerDto: CreateCustomerDto) {
    const { email, document } = createCustomerDto;

    const existingEmail = await this.customerRepository.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    const existingDocument = await this.customerRepository.findByDocument(document);
    if (existingDocument) {
      throw new BadRequestException('Document already in use');
    }

    return this.customerRepository.create(createCustomerDto);
  }
}
