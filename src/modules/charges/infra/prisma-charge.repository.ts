import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { Charge } from '../domain/charge.entity';
import {
  CreateChargeData,
  IChargeRepository,
} from '../domain/charge.repository';
import { CreateChargeDto } from '../dto/create-charge.dto';
import { ChargeStatus } from '../domain/enums/charge-status.enum';

@Injectable()
export class PrismaChargeRepository implements IChargeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateChargeData): Promise<Charge> {
    if (data.transactionId) {
      const existing = await this.prisma.charge.findUnique({
        where: { transactionId: data.transactionId },
      });
      if (existing) return this.toDomain(existing);
    }

    const created = await this.prisma.charge.create({
      data: {
        customerId: data.customerId,
        amount: data.amount,
        currency: data.currency || 'BRL',
        paymentMethod: data.paymentMethod,
        installments: data.installments || null,
        dueDate: data.dueDate || null,
        transactionId: data.transactionId || undefined,
        status: 'PENDING',
      },
    });

    return this.toDomain(created);
  }

  async findById(id: string): Promise<Charge | null> {
    const data = await this.prisma.charge.findUnique({ where: { id } });
    if (!data) return null;

    if (
      data.status === 'PENDING' &&
      data.dueDate &&
      new Date() > data.dueDate
    ) {
      const updated = await this.prisma.charge.update({
        where: { id },
        data: { status: 'EXPIRED' },
      });

      return this.toDomain(updated);
    }
    return this.toDomain(data);
  }

  async listAll(): Promise<Charge[]> {
    const charges = await this.prisma.charge.findMany();

    const updatedCharges = await Promise.all(
      charges.map(async (charge) => {
        if (
          charge.status === 'PENDING' &&
          charge.dueDate &&
          new Date() > charge.dueDate
        ) {
          const updated = await this.prisma.charge.update({
            where: { id: charge.id },
            data: { status: 'EXPIRED' },
          });
          return this.toDomain(updated);
        }
        return this.toDomain(charge);
      }),
    );

    return updatedCharges;
  }

  async updateStatus(id: string, status: ChargeStatus): Promise<Charge> {
    const updated = await this.prisma.charge.update({
      where: { id },
      data: { status },
    });
    return this.toDomain(updated);
  }

  async findByCustomerId(customerId: string): Promise<Charge[]> {
    const charges = await this.prisma.charge.findMany({
      where: { customerId },
    });

    return charges.map(this.toDomain);
  }

  async findByTransactionId(transactionId: string): Promise<Charge | null> {
    const data = await this.prisma.charge.findUnique({
      where: { transactionId },
    });
    if (!data) return null;
    return this.toDomain(data);
  }

  private toDomain(data: any): Charge {
    return new Charge(
      data.id,
      data.customerId,
      Number(data.amount),
      data.currency,
      data.paymentMethod,
      data.status,
      data.installments ?? undefined,
      data.dueDate ?? undefined,
      data.transactionId ?? undefined,
      data.createdAt,
      data.updatedAt,
    );
  }
}
