import { useRepo } from "@automerge/react";

import DataDocumentProvider from "@providers/DataDocumentProvider";
import PositionsDocumentProvider from "@providers/PositionsDocumentProvider";

import useListsDocument from "@hooks/useListsDocument";

import App from "../App";

export default function ListSwitcher() {
  const repo = useRepo();
  const [listsDoc, changeListsDoc] = useListsDocument();

  if (!listsDoc?.lists || listsDoc.lists.length === 0) {
    return <div>No lists available</div>;
  }

  const currentList = listsDoc.lists.find(
    (list) => list.id === listsDoc.selectedListId,
  );

  if (!currentList) {
    return <div>List not found</div>;
  }

  const handleListChange = (listId: string) => {
    changeListsDoc((doc) => {
      doc.selectedListId = listId;
    });
  };

  const handleCreateList = () => {
    const listId = `list-${Date.now()}`;
    const listName = `List ${listsDoc.lists.length + 1}`;

    // Create new data document
    const dataHandle = repo.create({
      items: {},
      sections: {},
    });

    // Create new positions document
    const positionsHandle = repo.create({
      sections: [],
      items: {},
    });

    // Add new list to lists document
    changeListsDoc((doc) => {
      doc.lists.push({
        id: listId,
        name: listName,
        dataDocUrl: dataHandle.url,
        positionsDocUrl: positionsHandle.url,
      });
      doc.selectedListId = listId;
    });
  };

  return (
    <>
      <div className="bg-base-200 p-4">
        <div className="flex gap-2">
          {listsDoc.lists.map((list) => (
            <button
              key={list.id}
              className={`btn btn-sm ${
                list.id === listsDoc.selectedListId
                  ? "btn-primary"
                  : "btn-ghost"
              }`}
              onClick={() => handleListChange(list.id)}
            >
              {list.name}
            </button>
          ))}
          <button
            className="btn btn-sm btn-outline btn-success"
            onClick={handleCreateList}
          >
            + New List
          </button>
        </div>
      </div>
      <DataDocumentProvider value={currentList.dataDocUrl}>
        <PositionsDocumentProvider value={currentList.positionsDocUrl}>
          <App />
        </PositionsDocumentProvider>
      </DataDocumentProvider>
    </>
  );
}
