import { useCallback, useMemo, useState } from "react";
import { animate } from "motion";
import { useMotionValue, useTransform, type PanInfo } from "motion/react";

import useElements from "@hooks//use-elements";

function useWidthSum(elements: ReadonlyArray<HTMLElement | null>): number {
  return useMemo(
    () =>
      elements.reduce((acc, element) => acc + (element?.offsetWidth ?? 0), 0),
    [elements],
  );
}

const INPUT_WRAPPER_GAP = 16;
const CONTENT_GAP = 32;

export default function useSyncedDrag(listLength: number) {
  const x = useMotionValue(0);
  const [currentPage, setCurrentPage] = useState(0);
  const {
    elements: contentElements,
    setElementFromRef: setContentElementFromRef,
  } = useElements<HTMLLIElement>();

  const {
    elements: inputWrapperElements,
    setElementFromRef: setInputWrapperElementFromRef,
  } = useElements<HTMLLIElement>();

  const contentListWidth = useWidthSum(contentElements);
  const inputWrapperElementsWidth = useWidthSum(inputWrapperElements);

  const inputWrapperElementsBound =
    inputWrapperElementsWidth + INPUT_WRAPPER_GAP * (listLength - 1);

  const contentListBound = contentListWidth + CONTENT_GAP * (listLength - 1);

  const contentX = useTransform(
    x,
    [-inputWrapperElementsBound, inputWrapperElementsBound],
    [-contentListBound, contentListBound],
  );

  const [inputWrapperElement] = inputWrapperElements;

  const inputWrapperElementWidth = useMemo(
    () => inputWrapperElement?.getBoundingClientRect().width ?? 0,
    [inputWrapperElement],
  );

  const move = useCallback(
    (index: number, velocity: number) => {
      animate(
        x,
        -(index * inputWrapperElementWidth + index * INPUT_WRAPPER_GAP),
        {
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
          velocity,
        },
      );
    },
    [x, inputWrapperElementWidth],
  );

  const handleDragEnd = useCallback(
    (_: unknown, { velocity, offset }: PanInfo) => {
      setCurrentPage((page) => {
        const newPage =
          Math.sign(offset.x) === 1
            ? Math.max(0, page - 1)
            : Math.min(listLength - 1, page + 1);

        move(newPage, velocity.x);

        return newPage;
      });
    },
    [x, move, listLength],
  );

  const currentContentElement = contentElements[currentPage];

  return {
    move,
    currentPage,
    setCurrentPage,
    setContentElementFromRef,
    setInputWrapperElementFromRef,
    currentContentElement,
    contentListProps: {
      style: {
        x: contentX,
        gap: CONTENT_GAP,
      },
    },
    inputListProps: {
      drag: "x" as const,
      style: {
        x,
        gap: INPUT_WRAPPER_GAP,
        left: `calc(50% - ${inputWrapperElementWidth / 2}px)`,
      },
      dragDirectionLock: true,
      // dragConstraints: { left: -inputWrapperElementsWidth, right: 0 },
      onDragEnd: handleDragEnd,
    },
  };
}
