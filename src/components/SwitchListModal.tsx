import { MODAL } from "@constants";
import { useRef } from "react";

import useListsDocument from "@hooks/useListsDocument";

const ID = MODAL.switch_list;

export default function SwitchListModal() {
  const ref = useRef<HTMLInputElement>(null);

  const [listsDoc, changeListsDoc] = useListsDocument();

  const handleListChange = (listId: string) => {
    if (!ref.current) return;

    ref.current.checked = false;

    changeListsDoc((doc) => {
      doc.selectedListId = listId;
    });
  };

  return (
    <>
      <input ref={ref} type="checkbox" id={ID} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <ul className="flex flex-col gap-2">
            {listsDoc?.lists.map((list) => (
              <button
                key={list.id}
                className={`btn rounded-box ${
                  list.id === listsDoc.selectedListId
                    ? "btn-neutral"
                    : "btn-ghost"
                }`}
                onClick={() => handleListChange(list.id)}
              >
                {list.name}
              </button>
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
