import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TestEntityService } from "./testEntity.service";
import { TestEntityController } from "./testEntity.controller";
import { TestEntityResolver } from "./testEntity.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TestEntityController],
  providers: [TestEntityService, TestEntityResolver],
  exports: [TestEntityService],
})
export class TestEntityModule {}
