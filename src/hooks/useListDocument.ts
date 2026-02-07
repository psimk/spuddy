import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/react";

import type { ListDocument } from "../types";

export default function useListDocument(url: AutomergeUrl) {
  return useDocument<ListDocument>(url, { suspense: true });
}
