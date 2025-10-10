import { useCallback, useMemo } from "react";
import { animate } from "motion";
import { useMotionValue, useTransform } from "motion/react";

import useElements from "@shared/hooks/use-elements";
import useWidthSum from "@shared/hooks/use-element-width-sum";

type Props = {
  listLength: number;
  inputWrapperGap: number;
  contentGap: number;
};

export default function useSyncedDrag({
  listLength,
  inputWrapperGap,
  contentGap,
}: Props) {
  const x = useMotionValue(0);
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
    inputWrapperElementsWidth + inputWrapperGap * (listLength - 1);

  const contentListBound = contentListWidth + contentGap * (listLength - 1);

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
        -(index * inputWrapperElementWidth + index * inputWrapperGap),
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

  return {
    move,
    contentElements,
    setContentElementFromRef,
    setInputWrapperElementFromRef,
    contentListProps: {
      style: {
        x: contentX,
        gap: contentGap,
      },
    },
    inputListProps: {
      style: {
        x,
        gap: inputWrapperGap,
        left: `calc(50% - ${inputWrapperElementWidth / 2}px)`,
      },
    },
  };
}
