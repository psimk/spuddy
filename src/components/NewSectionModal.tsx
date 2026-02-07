import { MODAL } from "@constants";
import { useRef } from "react";

import { invariant } from "@utils/invariant";

import useCreateSection from "@hooks/useCreateSection";

const ID = MODAL.new_section;

export default function NewSectionModal() {
  const createSection = useCreateSection();
  const ref = useRef<HTMLInputElement>(null);

  const action = (formData: FormData) => {
    const name = formData.get("name")?.toString().trim();

    invariant(name, "Section name is required");

    if (!ref.current) return;

    ref.current.checked = false;

    createSection(name);
  };

  return (
    <>
      <input ref={ref} type="checkbox" id={ID} className="modal-toggle" />
      <div className="modal" role="dialog">
        <form action={action} className="modal-box">
          <h3 className="text-lg font-bold">New Section</h3>
          <div className="py-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your section name..."
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
