import { DragDropProvider } from "@dnd-kit/react";

import scrollToBottom from "@utils/scroll-to-bottom";

import useAddItem from "@hooks/useAddItem";
import useSortablePositions from "@hooks/useSortablePositions";

import AddItemForm from "@components/AddItemForm";
import ErrorBoundary from "@components/ErrorBoundary";
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
    <div className="flex flex-col flex-1">
      <div className="p-4 mt-auto">
        <DragDropProvider {...handlers}>
          <div className="grid gap-4">
            {sections.map((sectionId, index) => (
              <ErrorBoundary key={sectionId} ignore>
                <ListSection id={sectionId} index={index}>
                  {items[sectionId].map((itemId, itemIndex) => (
                    <ListItem
                      sectionId={sectionId}
                      key={itemId}
                      id={itemId}
                      index={itemIndex}
                    />
                  ))}
                </ListSection>
              </ErrorBoundary>
            ))}
          </div>
        </DragDropProvider>
      </div>
      <AddItemFormWithAction />
    </div>
  );
}

export default App;
