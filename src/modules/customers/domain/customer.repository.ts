import { Customer } from './customer.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';

export abstract class ICustomerRepository {
  abstract create(data: CreateCustomerDto): Promise<Customer>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract findAll(): Promise<Customer[]>;
  abstract findById(id: string): Promise<Customer | null>;
}
