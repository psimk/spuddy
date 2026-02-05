import { Suspense } from "react";

import DataDocumentProvider from "@providers/DataDocumentProvider";
import PositionsDocumentProvider from "@providers/PositionsDocumentProvider";

import useCreateList from "@hooks/useCreateList";
import useListsDocument from "@hooks/useListsDocument";

import App from "../App";
import AddItemForm from "./AddItemForm";
import ListNavigation from "./ListNavigation";

export default function ListSwitcher() {
  const [listsDoc] = useListsDocument();
  const createList = useCreateList();

  if (!listsDoc?.lists || listsDoc.lists.length === 0) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
        <button className="btn btn-lg btn-primary" onClick={createList}>
          + Create New List
        </button>
      </div>
    );
  }

  const currentList = listsDoc.lists.find(
    (list) => list.id === listsDoc.selectedListId,
  );

  if (!currentList) {
    return <div>List not found</div>;
  }

  return (
    <main className="bg-base-300 min-h-screen flex flex-col">
      <ListNavigation />
      <DataDocumentProvider value={currentList.dataDocUrl}>
        <PositionsDocumentProvider value={currentList.positionsDocUrl}>
          <Suspense
            fallback={
              <div className="flex flex-col flex-1">
                <div className="p-4 mt-auto"></div>

                <AddItemForm disabled />
              </div>
            }
          >
            <App />
          </Suspense>
        </PositionsDocumentProvider>
      </DataDocumentProvider>
    </main>
  );
}
