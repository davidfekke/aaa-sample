import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CustomerList } from "./CustomerList";
import { CreateCustomer } from "./CreateCustomer";
import { Customer } from "./Customer";

export const CustomerIndex = (): React.ReactElement => {
  useBreadcrumbs("/customers/", "Customers");

  return (
    <Switch>
      <PrivateRoute exact path={"/customers/"} component={CustomerList} />
      <PrivateRoute path={"/customers/new"} component={CreateCustomer} />
      <PrivateRoute path={"/customers/:id"} component={Customer} />
    </Switch>
  );
};
