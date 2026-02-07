import type { AutomergeUrl } from "@automerge/automerge-repo";
import { createContext } from "react";

const CurrentListContext = createContext<Nullable<AutomergeUrl>>(null);

export default CurrentListContext;
