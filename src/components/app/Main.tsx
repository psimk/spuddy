import { useEffect } from "react";

import db from "@services/instantdb/db";

import MainSkeleton from "./MainSkeleton";
import Lists from "./Lists";
import { createList } from "@services/instantdb/actions";
import { listsQuery } from "@services/instantdb/queries";

function useInstantLists() {
  const { data, isLoading, error } = db.useQuery(listsQuery());

  useEffect(() => {
    if (data?.lists.length === 0) createList();
  }, [data]);

  return { data, isLoading, error };
}

export default function Main() {
  const { data, isLoading, error } = useInstantLists();

  if (isLoading) return <MainSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Lists
      // @ts-expect-error for some reason the `List` inferred type date fields, don't have the `Date` type
      lists={data.lists}
    />
  );
}
