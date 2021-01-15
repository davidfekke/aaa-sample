import { ArgsType, Field } from "@nestjs/graphql";
import { TestEntityWhereInput } from "./TestEntityWhereInput";

@ArgsType()
class FindManyTestEntityArgs {
  @Field(() => TestEntityWhereInput, { nullable: true })
  where?: TestEntityWhereInput;
}

export { FindManyTestEntityArgs };
