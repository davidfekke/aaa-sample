import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneCustomerArgs,
  FindManyCustomerArgs,
  CustomerCreateArgs,
  CustomerUpdateArgs,
  CustomerDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyCustomerArgs>(
    args: Subset<T, FindManyCustomerArgs>
  ) {
    return this.prisma.customer.findMany(args);
  }
  findOne<T extends FindOneCustomerArgs>(args: Subset<T, FindOneCustomerArgs>) {
    return this.prisma.customer.findOne(args);
  }
  create<T extends CustomerCreateArgs>(args: Subset<T, CustomerCreateArgs>) {
    return this.prisma.customer.create<T>(args);
  }
  update<T extends CustomerUpdateArgs>(args: Subset<T, CustomerUpdateArgs>) {
    return this.prisma.customer.update<T>(args);
  }
  delete<T extends CustomerDeleteArgs>(args: Subset<T, CustomerDeleteArgs>) {
    return this.prisma.customer.delete(args);
  }
}
