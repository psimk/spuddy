import { DragDropProvider } from "@dnd-kit/react";

import ListSection from "./components/ListSection";
import useSortableList from "./hooks/useSortableList";

function App() {
  const { state, handlers } = useSortableList();

  return (
    <main className="bg-base-300 min-h-screen p-4">
      <DragDropProvider {...handlers}>
        <div className="grid gap-4">
          {state.order.map((sectionId, index) => (
            <ListSection
              items={state.sections[sectionId]}
              key={sectionId}
              id={sectionId}
              index={index}
            />
          ))}
        </div>
      </DragDropProvider>
    </main>
  );
}

export default App;
