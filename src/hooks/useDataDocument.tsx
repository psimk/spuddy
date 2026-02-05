import { useDocument } from "@automerge/react";
import { useContext } from "react";

import DataDocumentContext from "@contexts/DataDocumentContext";

import { invariant } from "@utils/invariant";

import type { Data } from "../types";

export default function useDataDocument() {
  const url = useContext(DataDocumentContext);

  invariant(url, "useDataDocument must be used within DataDocumentProvider");

  return useDocument<Data>(url, { suspense: true });
}
