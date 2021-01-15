import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerWhereInput } from "./CustomerWhereInput";

@ArgsType()
class FindManyCustomerArgs {
  @Field(() => CustomerWhereInput, { nullable: true })
  where?: CustomerWhereInput;
}

export { FindManyCustomerArgs };
