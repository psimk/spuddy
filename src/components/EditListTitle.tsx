import type { AutomergeUrl } from "@automerge/automerge-repo";

import useListDocument from "@hooks/useListDocument";

type Props = {
  listUrl: AutomergeUrl;
};

export default function EditListTitle({ listUrl }: Props) {
  const [listDoc, changeListDoc] = useListDocument(listUrl);

  return (
    <div className="flex grow rounded-box bg-base-100/90 p-4 drop-shadow-xl/30 backdrop-blur-2xl">
      <input
        type="text"
        className="h-6 grow outline-none"
        value={listDoc.name}
        placeholder="Enter list name..."
        onChange={({ currentTarget: { value } }) => {
          changeListDoc((doc) => {
            doc.name = value;
          });
        }}
      />
    </div>
  );
}
