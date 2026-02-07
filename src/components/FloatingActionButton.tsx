import { MODAL } from "@constants";

export default function FloatingActionButton() {
  return (
    <div className="fab absolute">
      <div
        tabIndex={0}
        role="button"
        className="btn h-full rounded-box bg-base-100/90 p-4 btn-ghost drop-shadow-xl/30 backdrop-blur-2xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M2 3.75A.75.75 0 0 1 2.75 3h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.166a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <label
        htmlFor={MODAL.new_section}
        className="btn h-full rounded-box bg-base-100/90 p-4 btn-ghost drop-shadow-xl backdrop-blur-2xl"
      >
        New Section
      </label>

      <label
        htmlFor={MODAL.new_list}
        className="btn h-full rounded-box bg-base-100/90 p-4 btn-ghost drop-shadow-xl backdrop-blur-2xl"
      >
        New List
      </label>

      <label
        htmlFor={MODAL.switch_list}
        className="btn h-full rounded-box bg-base-100/90 p-4 btn-ghost drop-shadow-xl backdrop-blur-2xl"
      >
        Switch List
      </label>
    </div>
  );
}
