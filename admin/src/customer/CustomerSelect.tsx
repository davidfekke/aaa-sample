import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Customer } from "../api/customer/Customer";

type Data = Customer[];

type Props = Omit<SelectFieldProps, "options">;

export const CustomerSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/customers",
    async () => {
      const response = await api.get("/api/customers");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.firstName && item.firstName.length ? item.firstName : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
