import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/customer.entity';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { ICustomerRepository } from '../domain/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
export class PrismaCustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    const created = await this.prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        document: data.document,
        phone: data.phone || null,
      },
    });

    return this.toDomain(created);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const data = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!data) return null;
    return this.toDomain(data);
  }

  private toDomain(data: any): Customer {
    return new Customer(
      data.id,
      data.name,
      data.email,
      data.document,
      data.phone ?? undefined,
      data.createdAt,
      data.updatedAt,
    );
  }
}
