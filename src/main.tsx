import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import DataDocumentProvider from "@providers/DataDocumentProvider.tsx";
import PositionsDocumentProvider from "@providers/PositionsDocumentProvider.tsx";
import RepositoryProvider from "@providers/RepositoryProvider.tsx";

import composeProviders from "@utils/compose-providers.tsx";

import App from "./App.tsx";
import "./main.css";

const Provider = composeProviders(
  StrictMode,
  (props) => <Suspense {...props} fallback={<div>Loading documents...</div>} />,
  RepositoryProvider,
  DataDocumentProvider,
  PositionsDocumentProvider,
);

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>,
);
