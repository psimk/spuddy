import type { AutomergeUrl } from "@automerge/automerge-repo";
import { createContext } from "react";

const DataDocumentContext = createContext<Nullable<AutomergeUrl>>(null);

export default DataDocumentContext;
