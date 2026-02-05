import { useDocument } from "@automerge/react";
import { useContext } from "react";

import PositionsDocumentContext from "@contexts/PositionsDocumentContext";

import { invariant } from "@utils/invariant";

import { type Positions } from "../types";

export default function usePositionsDocument() {
  const url = useContext(PositionsDocumentContext);

  invariant(
    url,
    "usePositionsDocument must be used within PositionsDocumentProvider",
  );

  return useDocument<Positions>(url, { suspense: true });
}
