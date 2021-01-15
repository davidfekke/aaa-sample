import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerWhereUniqueInput } from "./CustomerWhereUniqueInput";

@ArgsType()
class FindOneCustomerArgs {
  @Field(() => CustomerWhereUniqueInput, { nullable: false })
  where!: CustomerWhereUniqueInput;
}

export { FindOneCustomerArgs };
