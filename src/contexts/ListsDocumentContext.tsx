import type { AutomergeUrl } from "@automerge/automerge-repo";
import { createContext } from "react";

const ListsDocumentContext = createContext<Nullable<AutomergeUrl>>(null);

export default ListsDocumentContext;
