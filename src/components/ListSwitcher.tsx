import DataDocumentProvider from "@providers/DataDocumentProvider";
import PositionsDocumentProvider from "@providers/PositionsDocumentProvider";

import useListsDocument from "@hooks/useListsDocument";

import App from "../App";

export default function ListSwitcher() {
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
