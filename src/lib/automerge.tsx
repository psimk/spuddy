import  {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { Repo } from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter, RepoContext } from "@automerge/react";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import type { AutomergeUrl } from "@automerge/automerge-repo";
import type { DataDocumentState, PositionsDocumentState } from "../types";

const DATA_DOC_URL_KEY = "spuddy-data-doc-url";
const POSITIONS_DOC_URL_KEY = "spuddy-positions-doc-url";

interface DocumentUrls {
  dataUrl: AutomergeUrl;
  positionsUrl: AutomergeUrl;
}

const DocumentUrlsContext = createContext<DocumentUrls | null>(null);

interface AutomergeProviderProps {
  children: ReactNode;
  initialData: DataDocumentState;
  initialPositions: PositionsDocumentState;
}

export function AutomergeProvider({
  children,
  initialData,
  initialPositions,
}: AutomergeProviderProps) {
  const repo = useMemo(() => {
    return new Repo({
      storage: new IndexedDBStorageAdapter(),
      network: [new BroadcastChannelNetworkAdapter()],
    });
  }, []);

  const docUrls = useMemo(() => {
    const storedDataUrl = localStorage.getItem(DATA_DOC_URL_KEY);
    const storedPositionsUrl = localStorage.getItem(POSITIONS_DOC_URL_KEY);

    if (storedDataUrl && storedPositionsUrl) {
      if (import.meta.env.DEV) {
        console.log("Using existing documents:", {
          data: storedDataUrl,
          positions: storedPositionsUrl,
        });
      }
      return {
        dataUrl: storedDataUrl as AutomergeUrl,
        positionsUrl: storedPositionsUrl as AutomergeUrl,
      };
    }

    // Create new documents
    const dataHandle = repo.create(initialData);
    const positionsHandle = repo.create(initialPositions);

    localStorage.setItem(DATA_DOC_URL_KEY, dataHandle.url);
    localStorage.setItem(POSITIONS_DOC_URL_KEY, positionsHandle.url);

    if (import.meta.env.DEV) {
      console.log("Created new documents:", {
        data: dataHandle.url,
        positions: positionsHandle.url,
      });
    }

    return {
      dataUrl: dataHandle.url,
      positionsUrl: positionsHandle.url,
    };
  }, [repo, initialData, initialPositions]);

  return (
    <RepoContext.Provider value={repo}>
      <DocumentUrlsContext.Provider value={docUrls}>
        {children}
      </DocumentUrlsContext.Provider>
    </RepoContext.Provider>
  );
}

export function useDocumentUrls(): DocumentUrls {
  const docUrls = useContext(DocumentUrlsContext);

  if (!docUrls) {
    throw new Error("useDocumentUrls must be used within AutomergeProvider");
  }

  return docUrls;
}
