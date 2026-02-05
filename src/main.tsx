import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AutomergeProvider } from "./lib/automerge.tsx";
import { INITIAL_DATA, INITIAL_POSITIONS } from "./constants.ts";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading documents...</div>}>
      <AutomergeProvider
        initialData={INITIAL_DATA}
        initialPositions={INITIAL_POSITIONS}
      >
        <App />
      </AutomergeProvider>
    </Suspense>
  </StrictMode>,
);
