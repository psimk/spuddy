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
        "list-row p-4 flex after:hidden focus-within:my-2 group bg-base-100 focus-within:shadow-2xl focus-within:rounded-box  focus-within:z-10 transition-all relative rounded-none",
        className,
      )}
      ref={ref}
    >
      {!hideHandle && (
        <span
          ref={handleRef}
          className="h-full absolute right-0 top-0 p-4 flex items-center justify-center cursor-move text-base-content group-focus-within:opacity-0 transition-opacity group-focus-within:pointer-events-none"
        >
          <DotsGridIcon />
        </span>
      )}
      <Suspense
        fallback={
          <AutoHeightTextArea
            className="textarea p-0 bg-transparent mr-10 group-focus-within:mr-0 rounded-none list-col-grow textarea-ghost min-h-3.5 w-full touch-pan-y resize-none whitespace-pre disabled:opacity-50 outline-none text-base m-0 border-0"
            value="..."
            disabled
          />
        }
      >
        <ComposedAutoHeightTextArea
          id={id}
          disabled={disabled}
          className="textarea p-0 bg-transparent mr-10 group-focus-within:mr-0 rounded-none list-col-grow textarea-ghost min-h-3.5 w-full touch-pan-y resize-none whitespace-pre disabled:opacity-50 outline-none m-0 text-base border-0"
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
          isDragging ? cn(className, "bg-transparent my-2") : className
        }
        disabled={isDragging}
      />
    );
  },
});

export default ComposedListItem;
