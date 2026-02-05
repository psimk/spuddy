import type { AutomergeUrl } from "@automerge/automerge-repo";
import { type PropsWithChildren } from "react";

import PositionsDocumentContext from "@contexts/PositionsDocumentContext";

type Props = {
  value: AutomergeUrl;
};

export default function PositionsDocumentProvider(
  props: PropsWithChildren<Props>,
) {
  return <PositionsDocumentContext.Provider {...props} />;
}
