import { DragDropProvider } from "@dnd-kit/react";

import useSortablePositions from "@hooks/useSortablePositions";

import ListItem from "@components/ListItem";
import ListSection from "@components/ListSection";

function App() {
  const { order, itemPositions, handlers } = useSortablePositions();

  return (
    <main className=" bg-base-100 min-h-screen p-4 bg-base-300">
      <DragDropProvider {...handlers}>
        <div className="grid gap-4">
          {order.map((sectionId, index) => (
            <ListSection key={sectionId} id={sectionId} index={index}>
              {itemPositions[sectionId].map((itemId, itemIndex) => (
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
    </main>
  );
}

export default App;
