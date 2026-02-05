import { DragDropProvider } from "@dnd-kit/react";

import useSortablePositions from "@hooks/useSortablePositions";

import AddItemForm from "@components/AddItemForm";
import ErrorBoundary from "@components/ErrorBoundary";
import ListItem from "@components/ListItem";
import ListSection from "@components/ListSection";

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
      <AddItemForm />
    </div>
  );
}

export default App;
