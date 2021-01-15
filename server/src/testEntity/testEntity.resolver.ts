import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { TestEntityService } from "./testEntity.service";
import { CreateTestEntityArgs } from "./CreateTestEntityArgs";
import { UpdateTestEntityArgs } from "./UpdateTestEntityArgs";
import { DeleteTestEntityArgs } from "./DeleteTestEntityArgs";
import { FindManyTestEntityArgs } from "./FindManyTestEntityArgs";
import { FindOneTestEntityArgs } from "./FindOneTestEntityArgs";
import { TestEntity } from "./TestEntity";

@graphql.Resolver(() => TestEntity)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TestEntityResolver {
  constructor(
    private readonly service: TestEntityService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [TestEntity])
  @nestAccessControl.UseRoles({
    resource: "TestEntity",
    action: "read",
    possession: "any",
  })
  async testEntities(
    @graphql.Args() args: FindManyTestEntityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TestEntity[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "TestEntity",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => TestEntity, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "TestEntity",
    action: "read",
    possession: "own",
  })
  async testEntity(
    @graphql.Args() args: FindOneTestEntityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TestEntity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "TestEntity",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => TestEntity)
  @nestAccessControl.UseRoles({
    resource: "TestEntity",
    action: "create",
    possession: "any",
  })
  async createTestEntity(
    @graphql.Args() args: CreateTestEntityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TestEntity> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "TestEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"TestEntity"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => TestEntity)
  @nestAccessControl.UseRoles({
    resource: "TestEntity",
    action: "update",
    possession: "any",
  })
  async updateTestEntity(
    @graphql.Args() args: UpdateTestEntityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TestEntity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "TestEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"TestEntity"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => TestEntity)
  @nestAccessControl.UseRoles({
    resource: "TestEntity",
    action: "delete",
    possession: "any",
  })
  async deleteTestEntity(
    @graphql.Args() args: DeleteTestEntityArgs
  ): Promise<TestEntity | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
