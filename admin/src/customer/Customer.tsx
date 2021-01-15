import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Customer as TCustomer } from "../api/customer/Customer";
import { CustomerUpdateInput } from "../api/customer/CustomerUpdateInput";

export const Customer = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/customers/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TCustomer,
    AxiosError,
    [string, string]
  >(["get-/api/customers", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/customers"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TCustomer, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/customers"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//customers");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TCustomer, AxiosError, CustomerUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/customers"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: CustomerUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.firstName);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["email", "firstName", "isActive", "lastName", "phone"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Customer"} ${
                  data?.firstName && data?.firstName.length
                    ? data.firstName
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField type="email" label="Email" name="email" />
            </div>
            <div>
              <TextField label="FirstName" name="firstName" />
            </div>
            <div>
              <ToggleField label="isActive" name="isActive" />
            </div>
            <div>
              <TextField label="LastName" name="lastName" />
            </div>
            <div>
              <TextField label="Phone" name="phone" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
