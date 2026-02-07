import type { AutomergeUrl } from "@automerge/automerge-repo";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { Suspense } from "react";

import scrollToBottom from "@utils/scroll-to-bottom";

import useAddItem from "@hooks/useAddItem";
import useSortablePositions from "@hooks/useSortablePositions";

import AddItemForm from "@components/AddItemForm";
import FloatingActionButton from "@components/FloatingActionButton";
import ListItem from "@components/ListItem";
import ListSection from "@components/ListSection";

function AddItemFormWithAction() {
  const addItem = useAddItem();
  const handleSubmit = (formData: FormData) => {
    const text = formData.get("text")?.toString().trim();

    if (!text) return;

    addItem(text.trim());
    scrollToBottom();
  };

  return <AddItemForm action={handleSubmit} />;
}

function App() {
  const { sections, items, handlers } = useSortablePositions();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-auto px-4">
        <DragDropProvider {...handlers}>
          <div className="grid gap-4">
            {sections.map((sectionId, index) => (
              <ListSection key={sectionId} id={sectionId} index={index}>
                {items[sectionId].map((itemId, itemIndex) => (
                  <Suspense fallback={null}>
                    <ListItem.Sortable
                      className={
                        items[sectionId].length - 1 === itemIndex
                          ? "rounded-b-xl"
                          : undefined
                      }
                      sectionId={sectionId}
                      key={itemId}
                      id={itemId}
                      index={itemIndex}
                    />
                  </Suspense>
                ))}
              </ListSection>
            ))}
          </div>
          <DragOverlay disabled={(source) => source?.type === "section"}>
            {({ id, type }) =>
              type === "section" ? null : (
                <ListItem
                  className="rounded-xl shadow-2xl"
                  id={id as AutomergeUrl}
                />
              )
            }
          </DragOverlay>
        </DragDropProvider>
      </div>

      <div className="sticky bottom-0 flex gap-4 p-4">
        <AddItemFormWithAction />
        <FloatingActionButton />
      </div>
    </div>
  );
}

export default App;
