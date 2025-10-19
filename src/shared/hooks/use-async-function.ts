import { useCallback, useState } from "react";

export default function useAsyncFunction() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);

  const handleAsync = useCallback(
    async (
      callback: () => Promise<unknown>,
      onSuccess?: () => void,
      onFailure?: () => void,
    ) => {
      setIsPending(true);

      try {
        await callback();
        onSuccess?.();
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
        onFailure?.();
      } finally {
        setIsPending(false);
      }
    },
    [],
  );

  const resetError = useCallback(() => setError(null), []);

  return { handleAsync, isPending, error, resetError };
}
