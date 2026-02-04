import { CollisionPriority } from "@dnd-kit/abstract";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import { defaultPreset } from "@dnd-kit/dom";
import { Debug } from "@dnd-kit/dom/plugins/debug";

type Item = {
  id: string;
};

type Section = Array<Item>;
type Sections = Record<string, Section>;

const SECTIONED_LIST: Sections = {
  Dairy: [
    { id: "item-1" },
    { id: "item-2" },
    { id: "item-3" },
    { id: "item-4" },
    { id: "item-5" },
  ],
  Vegetables: [
    { id: "item-6" },
    { id: "item-7" },
    { id: "item-8" },
    { id: "item-9" },
    { id: "item-10" },
  ],
};

function PlayIcon() {
  return (
    <svg
      className="size-[1.2em]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
      >
        <path d="M6 3L20 12 6 21 6 3z"></path>
      </g>
    </svg>
  );
}

function ListItem({
  id,
  index,
  sectionId,
  onPlayClick,
}: Item & { index: number; sectionId: string; onPlayClick: () => void }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group: sectionId,
    type: "item",
    accept: ["item"],
    data: { sectionId },
    feedback: "clone",
  });

  return (
    <li
      className="list-row"
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>
        <img
          className="rounded-box size-10"
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />
      </div>
      <div>
        <div>Dio Lupa</div>
        <div className="text-xs font-semibold uppercase opacity-60">
          Remaining Reason
        </div>
      </div>
      <button className="btn btn-square btn-ghost" onClick={onPlayClick}>
        <PlayIcon />
      </button>
    </li>
  );
}

function ListSection({
  id,
  items,
  index,
  convertItemToSection,
}: {
  index: number;
  id: string;
  items: Section;
  convertItemToSection: (item: Item) => void;
}) {
  const { ref } = useSortable({
    accept: ["section", "item"],
    collisionPriority: CollisionPriority.Low,
    id,
    index,
    type: "section",
  });

  return (
    <ul className="list bg-base-100 rounded-box shadow-md" ref={ref}>
      <li
        className={`p-4 ${items.length > 0 ? "pb-2" : ""} text-xs tracking-wide opacity-60`}
      >
        {id.toUpperCase()}
      </li>

      {items.map((item, index) => (
        <ListItem
          {...item}
          onPlayClick={() => convertItemToSection(item)}
          key={item.id}
          index={index}
          sectionId={id}
        />
      ))}
    </ul>
  );
}

function App() {
  const [state, setState] = useState({
    sections: SECTIONED_LIST,
    order: Object.keys(SECTIONED_LIST),
  });

  const convertItemToSection = (item: Item) => {
    setState((previous) => {
      const newSections: Sections = {};
      let orderIndexToInsert = previous.order.length;

      // Remove the item from its current section
      for (const [orderIndex, sectionId] of previous.order.entries()) {
        const items = previous.sections[sectionId];

        newSections[sectionId] = items;

        if (!items.includes(item)) continue;

        newSections[sectionId] = newSections[sectionId].filter(
          (sitem) => sitem.id !== item.id,
        );
        orderIndexToInsert = orderIndex + 1;
      }

      newSections[item.id] = [];
      const newOrder = [...previous.order];
      newOrder.splice(orderIndexToInsert, 0, item.id);

      return { sections: newSections, order: newOrder };
    });
  };

  return (
    <main className="bg-base-300 min-h-screen p-4">
      <DragDropProvider
        // plugins={[...defaultPreset.plugins, Debug]}
        onDragOver={(event) => {
          const { source } = event.operation;

          // We can rely on optimistic sorting for columns
          if (source?.type === "section") {
            setState((previous) => ({
              ...previous,
              order: move(previous.order, event),
            }));
            return;
          }

          setState((previous) => ({
            ...previous,
            sections: move(previous.sections, event),
          }));
        }}
      >
        <div className="grid gap-4">
          {state.order.map((sectionId, index) => (
            <ListSection
              items={state.sections[sectionId]}
              key={sectionId}
              id={sectionId}
              index={index}
              convertItemToSection={convertItemToSection}
            />
          ))}
        </div>
      </DragDropProvider>
    </main>
  );
}

export default App;
