import type { AutomergeUrl } from "@automerge/automerge-repo";
import { type PropsWithChildren } from "react";

import DataDocumentContext from "@contexts/DataDocumentContext";

type Props = {
  value: AutomergeUrl;
};

export default function DataDocumentProvider(props: PropsWithChildren<Props>) {
  return <DataDocumentContext.Provider {...props} />;
}
