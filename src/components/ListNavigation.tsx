import useListsDocument from "@hooks/useListsDocument";
import useCreateList from "@hooks/useCreateList";

export default function ListNavigation() {
  const [listsDoc, changeListsDoc] = useListsDocument();
  const createList = useCreateList();

  if (!listsDoc?.lists) {
    return null;
  }

  const handleListChange = (listId: string) => {
    changeListsDoc((doc) => {
      doc.selectedListId = listId;
    });
  };

  return (
    <div className="overflow-hidden">
      <div className="bg-base-200 p-4 overflow-x-auto">
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
            onClick={createList}
          >
            + New List
          </button>
        </div>
      </div>
    </div>
  );
}
