import { ArgsType, Field } from "@nestjs/graphql";
import { TestEntityWhereUniqueInput } from "./TestEntityWhereUniqueInput";
import { TestEntityUpdateInput } from "./TestEntityUpdateInput";

@ArgsType()
class UpdateTestEntityArgs {
  @Field(() => TestEntityWhereUniqueInput, { nullable: false })
  where!: TestEntityWhereUniqueInput;
  @Field(() => TestEntityUpdateInput, { nullable: false })
  data!: TestEntityUpdateInput;
}

export { UpdateTestEntityArgs };
