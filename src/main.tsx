import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AutomergeProvider } from "./lib/automerge.tsx";
import { INITIAL_STATE } from "./constants.ts";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading a document...</div>}>
      <AutomergeProvider initialData={INITIAL_STATE}>
        <App />
      </AutomergeProvider>
    </Suspense>
  </StrictMode>,
);
