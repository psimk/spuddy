import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useSortable } from "@dnd-kit/react/sortable";
import { type ComponentProps, type Ref, Suspense } from "react";

import { cn } from "@utils/cn";

import useItemDocument from "@hooks/useItemDocument";

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
};

function ListItem({
  id,
  className,
  ref,
  handleRef,
  hideHandle = false,
  disabled = false,
}: Props) {
  return (
    <li
      onFocus={({ currentTarget }) => {
        currentTarget.previousElementSibling?.classList.add("rounded-b-box");
        currentTarget.nextElementSibling?.classList.add("rounded-t-box");
      }}
      onBlur={({ currentTarget }) => {
        currentTarget.previousElementSibling?.classList.remove("rounded-b-box");
        currentTarget.nextElementSibling?.classList.remove("rounded-t-box");
      }}
      className={cn(
        "list-row group relative flex rounded-none bg-base-100 p-4 transition-all after:hidden focus-within:z-10 focus-within:my-2 focus-within:rounded-box focus-within:shadow-2xl",
        className,
      )}
      ref={ref}
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
    </li>
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
          if (isDragging && element) {
            element.nextElementSibling?.classList.toggle("rounded-t-box");
            element.previousElementSibling?.classList.toggle("rounded-b-box");
          } else if (!isDragging && element) {
            element.nextElementSibling?.classList.remove("rounded-t-box");
            element.previousElementSibling?.classList.remove("rounded-b-box");
          }

          return ref(element);
        }}
        handleRef={handleRef}
        hideHandle={isDragging}
        className={
          isDragging ? cn(className, "my-2 bg-transparent") : className
        }
        disabled={isDragging}
      />
    );
  },
});

export default ComposedListItem;
