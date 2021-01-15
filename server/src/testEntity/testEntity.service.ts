import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneTestEntityArgs,
  FindManyTestEntityArgs,
  TestEntityCreateArgs,
  TestEntityUpdateArgs,
  TestEntityDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class TestEntityService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyTestEntityArgs>(
    args: Subset<T, FindManyTestEntityArgs>
  ) {
    return this.prisma.testEntity.findMany(args);
  }
  findOne<T extends FindOneTestEntityArgs>(
    args: Subset<T, FindOneTestEntityArgs>
  ) {
    return this.prisma.testEntity.findOne(args);
  }
  create<T extends TestEntityCreateArgs>(
    args: Subset<T, TestEntityCreateArgs>
  ) {
    return this.prisma.testEntity.create<T>(args);
  }
  update<T extends TestEntityUpdateArgs>(
    args: Subset<T, TestEntityUpdateArgs>
  ) {
    return this.prisma.testEntity.update<T>(args);
  }
  delete<T extends TestEntityDeleteArgs>(
    args: Subset<T, TestEntityDeleteArgs>
  ) {
    return this.prisma.testEntity.delete(args);
  }
}
