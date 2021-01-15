import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TestEntityList } from "./TestEntityList";
import { CreateTestEntity } from "./CreateTestEntity";
import { TestEntity } from "./TestEntity";

export const TestEntityIndex = (): React.ReactElement => {
  useBreadcrumbs("/test-entities/", "TestEntities");

  return (
    <Switch>
      <PrivateRoute exact path={"/test-entities/"} component={TestEntityList} />
      <PrivateRoute path={"/test-entities/new"} component={CreateTestEntity} />
      <PrivateRoute path={"/test-entities/:id"} component={TestEntity} />
    </Switch>
  );
};
