import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/react";

import type { Item } from "../types";

export default function useItemDocument(url: AutomergeUrl) {
  return useDocument<Item>(url, { suspense: true });
}
