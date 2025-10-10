import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import db from "@app/services/instantdb/db";
import { createList } from "@app/services/instantdb/actions";
import { listsQuery } from "@app/services/instantdb/queries";
import type { Item, List } from "@app/services/instantdb/types";

import MainSkeleton from "./MainSkeleton";
import Lists from "./Lists";

function useInstantLists() {
  const { data, isLoading, error } = db.useQuery(listsQuery());

  useEffect(() => {
    if (data?.lists.length === 0) createList();
  }, [data]);

  return { data, isLoading, error };
}

type MainContextType = {
  lists: ReadonlyArray<List>;
  listContent: Record<string, ReadonlyArray<Item>>;
  activeListIndex: number;
  setActiveListIndex: (index: number) => void;
  setListContent: (id: List["id"], items: ReadonlyArray<Item>) => void;
};

const mainContext = createContext<MainContextType | null>(null);

type Props = { value: MainContextType };

function MainContextProvider(props: PropsWithChildren<Props>) {
  return <mainContext.Provider {...props} />;
}

export function useMainContext() {
  const context = useContext(mainContext);

  if (!context) {
    throw new Error("useMainContext must be used within MainContextProvider");
  }

  return context;
}

export default function Main() {
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

  if (isLoading) return <MainSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <MainContextProvider
      value={useMemo(
        () => ({
          lists: data?.lists ?? [],
          listContent,
          setListContent,
          activeListIndex,
          setActiveListIndex,
        }),
        [
          data,
          listContent,
          setListContent,
          activeListIndex,
          setActiveListIndex,
        ],
      )}
    >
      <Lists />
    </MainContextProvider>
  );
}
