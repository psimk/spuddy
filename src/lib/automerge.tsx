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
import type { AutomergeSortableState } from "../types";

const DOCUMENT_URL_KEY = "spuddy-automerge-doc-url-v2";

const DocumentUrlContext = createContext<AutomergeUrl | null>(null);

interface AutomergeProviderProps {
  children: ReactNode;
  initialData: AutomergeSortableState;
}

export function AutomergeProvider({
  children,
  initialData,
}: AutomergeProviderProps) {
  const repo = useMemo(() => {
    return new Repo({
      storage: new IndexedDBStorageAdapter(),
      network: [new BroadcastChannelNetworkAdapter()],
    });
  }, []);

  const docUrl = useMemo(() => {
    const storedUrl = localStorage.getItem(DOCUMENT_URL_KEY);

    if (storedUrl) {
      if (import.meta.env.DEV) {
        console.log("Using existing document:", storedUrl);
      }
      return storedUrl as AutomergeUrl;
    }

    // Create new document
    const handle = repo.create(initialData);

    localStorage.setItem(DOCUMENT_URL_KEY, handle.url);

    if (import.meta.env.DEV) {
      console.log("Created new document:", handle.url);
    }

    return handle.url;
  }, [repo, initialData]);

  return (
    <RepoContext.Provider value={repo}>
      <DocumentUrlContext.Provider value={docUrl}>
        {children}
      </DocumentUrlContext.Provider>
    </RepoContext.Provider>
  );
}

export function useDocumentUrl(): AutomergeUrl {
  const docUrl = useContext(DocumentUrlContext);

  if (!docUrl) {
    throw new Error("useDocumentUrl must be used within AutomergeProvider");
  }

  return docUrl;
}
