import { memo, useEffect, useMemo } from "react";

import orderSorter from "@shared/utils/order-sorter";

import { useListContext } from "@app/contexts/list-context";
import db from "@app/services/instantdb/db";
import { itemsQuery } from "@app/services/instantdb/queries";

export default memo(function ListContentSetter({ list }: { list: string }) {
  const { data: allData } = db.useQuery(itemsQuery({ list }));

  const { setListContent } = useListContext();

  const allItems = useMemo(
    () => allData?.items?.toSorted(orderSorter),
    [allData],
  );

  useEffect(() => {
    if (!allItems) return;

    setListContent(list, allItems);
  }, [allItems, setListContent, list]);

  return null;
});
