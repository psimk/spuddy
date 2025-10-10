import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router";

import type { Item, List } from "@app/services/instantdb/types";
import useInstantLists from "@app/hooks/use-instant-lists";
import { ListContextProvider } from "@app/contexts/list-context";

import MainSkeleton from "./ListSkeleton";

export default function ListLayout() {
  const { data, isLoading, error } = useInstantLists();
  const [listContent, setListContentState] = useState<
    Record<string, ReadonlyArray<Item>>
  >({});
  const [activeListIndex, setActiveListIndex] = useState(0);

  const setListContent = useCallback(
    (id: List["id"], items: ReadonlyArray<Item>) =>
      setListContentState((prev) => ({ ...prev, [id]: items })),
    [],
  );

  const value = useMemo(
    () => ({
      lists: data?.lists ?? [],
      listContent,
      setListContent,
      activeListIndex,
      setActiveListIndex,
    }),
    [data, listContent, setListContent, activeListIndex, setActiveListIndex],
  );

  if (isLoading) return <MainSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <ListContextProvider value={value}>
      <Outlet />
    </ListContextProvider>
  );
}
