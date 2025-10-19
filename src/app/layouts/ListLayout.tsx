import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

import { ListContextProvider } from "@app/contexts/list-context";
import useInstantLists from "@app/hooks/use-instant-lists";
import type { Item, List } from "@app/services/instantdb/types";

import ListSkeleton from "./ListSkeleton";

function useActiveListIndex(lists: ReadonlyArray<List>) {
  let { listId } = useParams();
  const navigate = useNavigate();

  const setActiveListIndex = useCallback(
    (index: number) => {
      const list = lists[index];
      if (!list) return;

      navigate(`/${list.id}`, { replace: true });
    },
    [lists],
  );

  const activeListIndex = useMemo(
    () => lists.findIndex((list) => list.id === listId),
    [lists, listId],
  );

  useEffect(() => {
    if (activeListIndex !== -1) return;
    if (lists.length > 0) {
      navigate(`/${lists[0].id}`, { replace: true });
      return;
    }

    navigate("/", { replace: true });
  }, [activeListIndex, navigate, lists]);

  return { activeListIndex, setActiveListIndex };
}

function useListContentState() {
  const [listContent, setListContentState] = useState<
    Record<string, ReadonlyArray<Item>>
  >({});

  const setListContent = useCallback(
    (id: List["id"], items: ReadonlyArray<Item>) =>
      setListContentState((prev) => ({ ...prev, [id]: items })),
    [],
  );

  return { listContent, setListContent };
}

export default function ListLayout() {
  const { data, isLoading, error } = useInstantLists();

  const lists = data?.lists ?? [];

  const { activeListIndex, setActiveListIndex } = useActiveListIndex(lists);
  const { listContent, setListContent } = useListContentState();

  const activeList = lists[activeListIndex];

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

  useEffect(() => {
    if (!activeList) return;

    document.title = `Spuddy | ${activeList.title || "Untitled List"}`;
  }, [activeList]);

  if (isLoading) return <ListSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <ListContextProvider value={value}>
      <Outlet />
    </ListContextProvider>
  );
}
