import { ArgsType, Field } from "@nestjs/graphql";
import { TestEntityWhereUniqueInput } from "./TestEntityWhereUniqueInput";

@ArgsType()
class FindOneTestEntityArgs {
  @Field(() => TestEntityWhereUniqueInput, { nullable: false })
  where!: TestEntityWhereUniqueInput;
}

export { FindOneTestEntityArgs };
