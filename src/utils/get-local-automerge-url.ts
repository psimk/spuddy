import type { AutomergeUrl, Repo } from "@automerge/automerge-repo";

function createLocalAutomergeUrl(
  repo: Repo,
  localStorageKey: string,
  initialData: unknown,
): AutomergeUrl {
  const handle = repo.create(initialData);

  localStorage.setItem(localStorageKey, handle.url);

  return handle.url;
}

export default function getLocalAutomergeUrl(
  repo: Repo,
  localStorageKey: string,
  initialData: unknown,
): AutomergeUrl {
  return (
    (localStorage.getItem(localStorageKey) as AutomergeUrl) ||
    createLocalAutomergeUrl(repo, localStorageKey, initialData)
  );
}
