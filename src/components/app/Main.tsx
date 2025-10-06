import { id } from "@instantdb/react";
import { useEffect } from "react";

import db from "@services/instantdb/db";

import MainSkeleton from "./MainSkeleton";
import Lists from "./Lists";

function createList() {
  db.transact(
    db.tx.lists[id()].create({
      title: "unknown",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  );
}

export default function Main() {
  const { data, isLoading, error } = db.useQuery({ lists: {} });

  const listLength = data?.lists.length;

  useEffect(() => {
    if (typeof listLength === "undefined") return;
    if (!listLength) createList();
  }, [listLength]);

  if (isLoading) return <MainSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Lists
      // @ts-expect-error for some reason the `List` inferred type date fields, don't have the `Date` type
      lists={data.lists}
    />
  );
}
