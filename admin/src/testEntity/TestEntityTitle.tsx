import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { TestEntity } from "../api/testEntity/TestEntity";

type Props = { id: string };

export const TestEntityTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TestEntity,
    AxiosError,
    [string, string]
  >(["get-/api/test-entities", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/test-entities"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/test-entities"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
