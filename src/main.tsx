import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import ListsDocumentProvider from "@providers/ListsDocumentProvider.tsx";
import RepositoryProvider from "@providers/RepositoryProvider.tsx";

import composeProviders from "@utils/compose-providers.tsx";

import ListSwitcher from "@components/ListSwitcher.tsx";

import "./main.css";

const Provider = composeProviders(
  // StrictMode,
  (props) => <Suspense {...props} fallback={<div>Loading documents...</div>} />,
  RepositoryProvider,
  ListsDocumentProvider,
);

createRoot(document.getElementById("root")!).render(
  <Provider>
    <ListSwitcher />
  </Provider>,
);
