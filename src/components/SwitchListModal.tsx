import type { AutomergeUrl } from "@automerge/automerge-repo";
import { MODAL } from "@constants";
import { Suspense, useRef } from "react";

import useListDocument from "@hooks/useListDocument";
import useListsDocument from "@hooks/useListsDocument";

const ID = MODAL.switch_list;

function ListButton({
  listUrl,
  isSelected,
  onClick,
}: {
  listUrl: AutomergeUrl;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [listDoc] = useListDocument(listUrl);

  return (
    <button
      className={`btn rounded-box ${isSelected ? "btn-neutral" : "btn-ghost"}`}
      onClick={onClick}
    >
      {listDoc.name}
    </button>
  );
}

export default function SwitchListModal() {
  const ref = useRef<HTMLInputElement>(null);

  const [listsDoc, changeListsDoc] = useListsDocument();

  const handleListChange = (listUrl: AutomergeUrl) => {
    if (!ref.current) return;

    ref.current.checked = false;

    changeListsDoc((doc) => {
      doc.selectedListUrl = listUrl;
    });
  };

  return (
    <>
      <input ref={ref} type="checkbox" id={ID} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <ul className="flex flex-col gap-2">
            {listsDoc.listUrls.map((listUrl) => (
              <Suspense
                key={listUrl}
                fallback={<div className="btn btn-ghost">Loading...</div>}
              >
                <ListButton
                  listUrl={listUrl}
                  isSelected={listUrl === listsDoc.selectedListUrl}
                  onClick={() => handleListChange(listUrl)}
                />
              </Suspense>
            ))}
          </ul>
        </div>
        <label className="modal-backdrop" htmlFor={ID}>
          Close
        </label>
      </div>
    </>
  );
}
