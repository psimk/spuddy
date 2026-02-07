import { Suspense } from "react";

import DataDocumentProvider from "@providers/DataDocumentProvider";
import PositionsDocumentProvider from "@providers/PositionsDocumentProvider";

import { invariant } from "@utils/invariant";

import useCreateList from "@hooks/useCreateList";
import useListsDocument from "@hooks/useListsDocument";

import AddItemForm from "@components/AddItemForm";
import EditListTitle from "@components/EditListTitle";
import List from "@components/List";
import NewListModal from "@components/NewListModal";
import NewSectionModal from "@components/NewSectionModal";
import SwitchListModal from "@components/SwitchListModal";

export default function App() {
  const [listsDoc] = useListsDocument();
  const createList = useCreateList();

  if (listsDoc.lists.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-300 p-4">
        <button
          className="btn btn-lg btn-primary"
          onClick={() => createList("My First List")}
        >
          + Create New List
        </button>
      </div>
    );
  }

  const currentList = listsDoc.lists.find(
    (list) => list.id === listsDoc.selectedListId,
  );

  invariant(currentList, "Selected list not found in lists document");

  return (
    <main className="flex min-h-screen flex-col bg-base-300">
      <header className="sticky top-0 z-10 flex gap-4 p-4">
        <EditListTitle />
      </header>

      <DataDocumentProvider value={currentList.dataDocUrl}>
        <PositionsDocumentProvider value={currentList.positionsDocUrl}>
          <Suspense
            fallback={
              <div className="flex flex-1 flex-col">
                <div className="mt-auto p-4"></div>

                <AddItemForm />
              </div>
            }
          >
            <List />
          </Suspense>

          <NewSectionModal />
        </PositionsDocumentProvider>
      </DataDocumentProvider>
      <NewListModal />
      <SwitchListModal />
    </main>
  );
}
