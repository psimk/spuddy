import type { AutomergeUrl } from "@automerge/automerge-repo";
import { createContext } from "react";

const PositionsDocumentContext = createContext<Nullable<AutomergeUrl>>(null);

export default PositionsDocumentContext;
