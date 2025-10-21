import { Injectable } from "@nestjs/common";
import { ICustomerRepository } from "../domain/customer.repository";

@Injectable()
export class ListCustomersUseCase {
    constructor(private readonly customerRepository: ICustomerRepository) {}

    async execute() {
        const customers = await this.customerRepository.findAll();
        return customers;
    }
}