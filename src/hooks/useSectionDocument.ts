import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/react";

import type { Section } from "../types";

export default function useSectionDocument(url: AutomergeUrl) {
  return useDocument<Section>(url, { suspense: true });
}
