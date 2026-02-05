import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BroadcastChannelNetworkAdapter, RepoContext } from "@automerge/react";
import { type PropsWithChildren } from "react";

const REPOSITORY = new Repo({
  storage: new IndexedDBStorageAdapter(),
  network: [new BroadcastChannelNetworkAdapter()],
});

export default function RepositoryProvider(props: PropsWithChildren) {
  return <RepoContext.Provider value={REPOSITORY} {...props} />;
}
