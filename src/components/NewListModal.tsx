import { MODAL } from "@constants";
import { useRef } from "react";

import { invariant } from "@utils/invariant";

import useCreateList from "@hooks/useCreateList";

const ID = MODAL.new_list;

export default function NewListModal() {
  const createList = useCreateList();
  const ref = useRef<HTMLInputElement>(null);

  const action = (formData: FormData) => {
    const name = formData.get("name")?.toString().trim();

    invariant(name, "List name is required");

    if (!ref.current) return;

    ref.current.checked = false;

    createList(name);
  };

  return (
    <>
      <input ref={ref} type="checkbox" id={ID} className="modal-toggle" />
      <div className="modal" role="dialog">
        <form action={action} className="modal-box">
          <h3 className="text-lg font-bold">New List</h3>
          <div className="py-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your list name..."
              required
              className="validator input w-full rounded-box input-ghost"
              autoFocus
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-neutral">
              Create
            </button>
            <label htmlFor={ID} className="btn btn-ghost">
              Cancel
            </label>
          </div>
        </form>
        <label className="modal-backdrop" htmlFor={ID}>
          Close
        </label>
      </div>
    </>
  );
}
