import { invariant } from "@utils/invariant";

import useListsDocument from "@hooks/useListsDocument";

export default function EditListTitle() {
  const [listsDoc, changeListsDoc] = useListsDocument();

  const currentList = listsDoc.lists.find(
    (list) => list.id === listsDoc.selectedListId,
  );

  invariant(currentList, "Selected list not found in lists document");

  return (
    <div className="flex grow rounded-box bg-base-100/90 p-4 drop-shadow-xl/30 backdrop-blur-2xl">
      <input
        type="text"
        className="h-6 grow outline-none"
        value={currentList.name}
        placeholder="Enter list name..."
        onChange={({ currentTarget: { value } }) => {
          changeListsDoc((doc) => {
            const list = doc.lists.find((l) => l.id === doc.selectedListId);

            invariant(list, "Selected list not found");

            list.name = value;
          });
        }}
      />
    </div>
  );
}
