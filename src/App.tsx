import type { AutomergeUrl } from "@automerge/automerge-repo";
import { Suspense } from "react";

import CurrentListProvider from "@providers/CurrentListProvider";
import DataDocumentProvider from "@providers/DataDocumentProvider";
import PositionsDocumentProvider from "@providers/PositionsDocumentProvider";

import { invariant } from "@utils/invariant";

import useCreateList from "@hooks/useCreateList";
import useListDocument from "@hooks/useListDocument";
import useListsDocument from "@hooks/useListsDocument";
import useSharedListHandler from "@hooks/useSharedListHandler";

import AddItemForm from "@components/AddItemForm";
import EditListTitle from "@components/EditListTitle";
import List from "@components/List";
import NewListModal from "@components/NewListModal";
import NewSectionModal from "@components/NewSectionModal";
import SwitchListModal from "@components/SwitchListModal";

export default function App() {
  const [listsDoc] = useListsDocument();
  const createList = useCreateList();

  // Handle shared lists from URL
  useSharedListHandler();

  if (listsDoc.listUrls.length === 0) {
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

  invariant(listsDoc.selectedListUrl, "No list selected");

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base-300">
          Loading...
        </div>
      }
    >
      <AppContent listUrl={listsDoc.selectedListUrl} />
    </Suspense>
  );
}

function AppContent({ listUrl }: { listUrl: AutomergeUrl }) {
  const [listDoc] = useListDocument(listUrl);

  return (
    <CurrentListProvider value={listUrl}>
      <main className="flex min-h-screen flex-col bg-base-300">
        <header className="sticky top-0 z-10 flex gap-4 p-4">
          <EditListTitle listUrl={listUrl} />
        </header>

        <DataDocumentProvider value={listDoc.dataDocUrl}>
          <PositionsDocumentProvider value={listDoc.positionsDocUrl}>
            <Suspense
              fallback={
                <div className="flex flex-1 flex-col">
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
    </CurrentListProvider>
  );
}
