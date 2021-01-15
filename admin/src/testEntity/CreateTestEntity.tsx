import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TestEntity } from "../api/testEntity/TestEntity";
import { TestEntityCreateInput } from "../api/testEntity/TestEntityCreateInput";

const INITIAL_VALUES = {} as TestEntityCreateInput;

export const CreateTestEntity = (): React.ReactElement => {
  useBreadcrumbs("/test-entities/new", "Create TestEntity");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TestEntity,
    AxiosError,
    TestEntityCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/test-entities", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/test-entities"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TestEntityCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create TestEntity"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
