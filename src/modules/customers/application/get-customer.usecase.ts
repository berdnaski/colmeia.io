import { Injectable, NotFoundException } from "@nestjs/common";
import { ICustomerRepository } from "../domain/customer.repository";

@Injectable()
export class GetCustomerUseCase {
    constructor(private readonly customerRepository: ICustomerRepository) {}

    async execute(id: string) {
        const customer = await this.customerRepository.findById(id);

        if (!customer) throw new NotFoundException('Customer not found');
        return customer;
    }
}