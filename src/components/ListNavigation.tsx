import useCreateList from "@hooks/useCreateList";
import useListsDocument from "@hooks/useListsDocument";

function Lists() {
  const [listsDoc, changeListsDoc] = useListsDocument();

  const handleListChange = (listId: string) => {
    changeListsDoc((doc) => {
      doc.selectedListId = listId;
    });
  };

  return (
    <>
      {listsDoc?.lists.map((list) => (
        <button
          key={list.id}
          className={`btn btn-sm ${
            list.id === listsDoc.selectedListId ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => handleListChange(list.id)}
        >
          {list.name}
        </button>
      ))}
    </>
  );
}

export default function ListNavigation() {
  const createList = useCreateList();

  return (
    <div className="navbar bg-base-200 p-4 shadow-sm">
      <div className="flex gap-2">
        <Lists />
        <button
          className="btn btn-outline btn-sm btn-success"
          onClick={createList}
        >
          + New List
        </button>
      </div>
    </div>
  );
}
