import { ArgsType, Field } from "@nestjs/graphql";
import { TestEntityWhereUniqueInput } from "./TestEntityWhereUniqueInput";

@ArgsType()
class DeleteTestEntityArgs {
  @Field(() => TestEntityWhereUniqueInput, { nullable: false })
  where!: TestEntityWhereUniqueInput;
}

export { DeleteTestEntityArgs };
