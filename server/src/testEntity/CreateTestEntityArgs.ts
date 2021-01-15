import { ArgsType, Field } from "@nestjs/graphql";
import { TestEntityCreateInput } from "./TestEntityCreateInput";

@ArgsType()
class CreateTestEntityArgs {
  @Field(() => TestEntityCreateInput, { nullable: false })
  data!: TestEntityCreateInput;
}

export { CreateTestEntityArgs };
