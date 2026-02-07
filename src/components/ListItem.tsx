import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  type PanInfo,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { type ComponentProps, type Ref, Suspense } from "react";

import { cn } from "@utils/cn";
import toggleSiblingRounding from "@utils/toggle-sibling-rounding";

import useItemDocument from "@hooks/useItemDocument";
import useRemoveItem from "@hooks/useRemoveItem";

import AutoHeightTextArea from "./AutoHeightTextArea";
import DotsGridIcon from "./DotsGridIcon";

type ComposedAutoHeightTextAreaProps = Omit<
  ComponentProps<typeof AutoHeightTextArea>,
  "onChange" | "value"
> & { id: AutomergeUrl };

function ComposedAutoHeightTextArea({
  id,
  ...props
}: ComposedAutoHeightTextAreaProps) {
  const [{ text }, changeItem] = useItemDocument(id);

  return (
    <AutoHeightTextArea
      id={id}
      {...props}
      onChange={(text) =>
        changeItem((doc) => {
          doc.text = text;
        })
      }
      value={text}
    />
  );
}

type Props = {
  id: AutomergeUrl;
  className?: string;
  ref?: Ref<HTMLLIElement>;
  handleRef?: Ref<HTMLSpanElement>;
  disabled?: boolean;
  hideHandle?: boolean;
  hideActions?: boolean;
};

const ACTION_WIDTH = 100;
const ANIMATION_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

function ListItem({
  id,
  className,
  ref,
  handleRef,
  hideHandle = false,
  hideActions = false,
  disabled = false,
}: Props) {
  const x = useMotionValue(0);
  const removeItem = useRemoveItem();

  const handleDragEnd = (_: unknown, { velocity }: PanInfo) => {
    if (x.get() > ACTION_WIDTH || velocity.x > 800) removeItem(id);
    else if (x.get() < -ACTION_WIDTH || velocity.x < -800) removeItem(id);
    else animate(x, 0, ANIMATION_CONFIG);
  };

  const actionX = useTransform(x, (latest) => -latest);

  return (
    <motion.li
      className="group relative list-none"
      onFocus={(event) => toggleSiblingRounding(event.currentTarget, "on")}
      onBlur={(event) => toggleSiblingRounding(event.currentTarget, "off")}
      ref={ref}
      drag="x"
      onDragEnd={handleDragEnd}
      style={{ x }}
      exit={{ opacity: 0 }}
      dragDirectionLock
      dragConstraints={{ left: -ACTION_WIDTH, right: ACTION_WIDTH }}
      dragElastic={0.5}
    >
      <div
        className={cn(
          "flex rounded-none bg-base-100 p-4 transition-all after:hidden focus-within:z-10 focus-within:my-2 focus-within:rounded-box focus-within:shadow-2xl",
          className,
        )}
      >
        {!hideHandle && (
          <span
            ref={handleRef}
            className="absolute top-0 right-0 flex h-full cursor-move items-center justify-center p-4 text-base-content transition-opacity group-focus-within:pointer-events-none group-focus-within:opacity-0"
          >
            <DotsGridIcon />
          </span>
        )}
        <Suspense
          fallback={
            <AutoHeightTextArea
              className="list-col-grow textarea m-0 mr-10 min-h-3.5 w-full touch-pan-y resize-none rounded-none border-0 textarea-ghost bg-transparent p-0 text-base whitespace-pre outline-none group-focus-within:mr-0 disabled:opacity-50"
              value="..."
              disabled
            />
          }
        >
          <ComposedAutoHeightTextArea
            id={id}
            disabled={disabled}
            className="list-col-grow textarea m-0 mr-10 min-h-3.5 w-full touch-pan-y resize-none rounded-none border-0 textarea-ghost bg-transparent p-0 text-base whitespace-pre outline-none group-focus-within:mr-0 disabled:opacity-50"
          />
        </Suspense>
      </div>
      {!hideActions && (
        <motion.div
          style={{ x: actionX }}
          className="absolute inset-0 -z-1 flex items-center justify-between px-4"
        >
          <span className="font-bold text-success-content uppercase">Done</span>
          <span className="font-bold text-success-content uppercase">Done</span>
        </motion.div>
      )}
    </motion.li>
  );
}

const ComposedListItem = Object.assign(ListItem, {
  Sortable({
    id,
    index,
    sectionId,
    className,
  }: {
    id: AutomergeUrl;
    index: number;
    sectionId: AutomergeUrl;
    className?: string;
  }) {
    const { ref, isDragging, handleRef } = useSortable({
      id,
      index,
      group: sectionId,
      type: "item",
      accept: ["item"],
      data: { sectionId },
      feedback: "clone",
    });

    return (
      <ListItem
        id={id}
        ref={(element) => {
          if (element) {
            toggleSiblingRounding(element, isDragging ? "on" : "off");
          }

          return ref(element);
        }}
        handleRef={handleRef}
        hideHandle={isDragging}
        hideActions={isDragging}
        className={
          isDragging ? cn(className, "my-2 bg-transparent") : className
        }
        disabled={isDragging}
      />
    );
  },
});

export default ComposedListItem;
