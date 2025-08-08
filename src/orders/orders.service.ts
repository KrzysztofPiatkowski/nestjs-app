import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { connect } from 'http2';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({ include: { product: true, client: true } });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }

  public async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { productId, clientId } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
        include: {
          product: true,
          client: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product or Client doesn't exist");
      throw error;
    }
  }

  public updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { productId, clientId } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
      include: {
        product: true,
        client: true,
      },
    });
  }

  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
