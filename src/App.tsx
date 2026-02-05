import { DragDropProvider } from "@dnd-kit/react";

import useSortablePositions from "@hooks/useSortablePositions";

import AddItemForm from "@components/AddItemForm";
import ListItem from "@components/ListItem";
import ListSection from "@components/ListSection";

function App() {
  const { sections, items, handlers } = useSortablePositions();

  return (
    <main className=" min-h-screen  bg-base-300">
      <div className="p-4">
        <DragDropProvider {...handlers}>
          <div className="grid gap-4">
            {sections.map((sectionId, index) => (
              <ListSection key={sectionId} id={sectionId} index={index}>
                {items[sectionId].map((itemId, itemIndex) => (
                  <ListItem
                    sectionId={sectionId}
                    key={itemId}
                    id={itemId}
                    index={itemIndex}
                  />
                ))}
              </ListSection>
            ))}
          </div>
        </DragDropProvider>
      </div>
      <AddItemForm />
    </main>
  );
}

export default App;
