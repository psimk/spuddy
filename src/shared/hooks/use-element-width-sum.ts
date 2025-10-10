import { useMemo } from "react";

export default function useWidthSum(
  elements: ReadonlyArray<Nullable<HTMLElement>>,
): number {
  return useMemo(
    () =>
      elements.reduce((acc, element) => acc + (element?.offsetWidth ?? 0), 0),
    [elements],
  );
}
