import { type PropsWithChildren, createContext, useContext } from "react";

import invariant from "@shared/utils/invariant";

import type { Item, List } from "@app/services/instantdb/types";

type ListContextType = {
  lists: ReadonlyArray<List>;
  listContent: Record<string, ReadonlyArray<Item>>;
  activeListIndex: number;
  setActiveListIndex: (index: number) => void;
  setListContent: (id: List["id"], items: ReadonlyArray<Item>) => void;
};

const listContext = createContext<Nullable<ListContextType>>(null);

const { Provider } = listContext;

type Props = { value: ListContextType };

export function ListContextProvider(props: PropsWithChildren<Props>) {
  return <Provider {...props} />;
}

export function useListContext() {
  const context = useContext(listContext);

  invariant(context, "useListContext must be used within ListContextProvider");

  return context;
}
