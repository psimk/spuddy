import { useEffect } from "react";

import { createList } from "@app/services/instantdb/actions";
import db from "@app/services/instantdb/db";
import { listsQuery } from "@app/services/instantdb/queries";

export default function useInstantLists() {
  const { data, isLoading, error } = db.useQuery(listsQuery());

  useEffect(() => {
    if (data?.lists.length === 0) createList();
  }, [data]);

  return { data, isLoading, error };
}
