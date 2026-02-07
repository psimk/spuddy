import { Suspense } from "react";
import { createRoot } from "react-dom/client";

import ListsDocumentProvider from "@providers/ListsDocumentProvider.tsx";
import RepositoryProvider from "@providers/RepositoryProvider.tsx";

import composeProviders from "@utils/compose-providers.tsx";

import App from "./App";
import "./main.css";

const Provider = composeProviders(
  (props) => <Suspense {...props} fallback={<div>Loading documents...</div>} />,
  RepositoryProvider,
  ListsDocumentProvider,
);

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>,
);
