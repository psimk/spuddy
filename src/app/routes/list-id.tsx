import { Plus, Share } from "lucide-react";
import { type PanInfo, motion } from "motion/react";
import { useCallback, useEffect } from "react";

import NavigationFooter from "@shared/components/NavigationFooter";
import NavigationInput from "@shared/components/NavigationInput";
import useScrollDirection from "@shared/hooks/use-scroll-direction";
import useSyncedDrag from "@shared/hooks/use-synced-drag";

import ListComponent from "@app/components/List";
import ListContentSetter from "@app/components/ListContentSetter";
import { useListContext } from "@app/contexts/list-context";
import { createItem } from "@app/services/instantdb/actions";

const ICON_SIZE = 24;

export default function ListId() {
  const { lists, activeListIndex, setActiveListIndex, listContent } =
    useListContext();
  const {
    move,
    setContentElementFromRef,
    setInputWrapperElementFromRef,
    inputListProps,
    contentElements,
    contentListProps,
  } = useSyncedDrag({
    listLength: lists.length,
    inputWrapperGap: 16,
    contentGap: 16,
  });

  const currentContentElement = contentElements[activeListIndex] ?? null;

  const { scrollDirection, setScrollDirection, scrollDirectionLockRef } =
    useScrollDirection(currentContentElement);

  const listLength = lists.length;

  useEffect(() => {
    // TODO: not sure if this is legal
    move(activeListIndex, 0);
  }, [activeListIndex, move]);

  const handleDragEnd = useCallback(
    (_: unknown, { velocity, offset }: PanInfo) => {
      const newIndex =
        Math.sign(offset.x) === 1
          ? Math.max(0, activeListIndex - 1)
          : Math.min(listLength - 1, activeListIndex + 1);

      move(newIndex, velocity.x);

      setActiveListIndex(newIndex);
    },
    [move, setActiveListIndex, activeListIndex, listLength],
  );

  const createHandleSubmit = useCallback(
    (index: number) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const item = formData.get("item")?.toString() ?? "";
      if (!item.trim()) return;

      event.currentTarget.reset();

      const list = lists[index];
      if (!list) return;

      const content = listContent[list.id];

      if (!content) return;

      createItem(item, list.id, content);

      requestAnimationFrame(() => {
        const contentElement = contentElements[index];

        if (!contentElement) return;

        const lastListItem =
          contentElement.querySelector("ul")?.lastElementChild
            ?.previousElementSibling;

        if (!lastListItem) return;

        lastListItem.scrollIntoView({ behavior: "instant", block: "end" });
      });
    },
    [lists, listContent, contentElements],
  );

  const hasMoreThanOneList = lists.length > 1;

  return (
    <div className="flex w-dvw flex-col">
      <section className="relative mx-auto w-dvw max-w-2xl flex-1 overflow-x-hidden">
        <motion.ul
          {...contentListProps}
          className="relative flex h-screen w-dvw max-w-2xl"
        >
          {lists.map(({ id }, index) => (
            <li
              key={id}
              ref={setContentElementFromRef(index)}
              className="h-full w-full max-w-full shrink-0 overflow-x-hidden overflow-y-scroll p-4 pb-29"
            >
              <ListComponent disableAutoScroll={hasMoreThanOneList} id={id} />
              <ListContentSetter list={id} />
            </li>
          ))}
        </motion.ul>
        <div className="to-base-100 absolute top-0 left-[-1px] h-full w-4 bg-linear-to-l from-transparent" />
        <div className="to-base-100 absolute top-0 right-[-1px] h-full w-4 bg-linear-to-r from-transparent" />
      </section>
      <NavigationFooter
        animate={scrollDirection}
        inputs={
          <motion.ul
            {...inputListProps}
            onDragEnd={handleDragEnd}
            dragDirectionLock
            drag="x"
            className="absolute bottom-12 flex"
          >
            {lists.map(({ id }, index) => (
              <form onSubmit={createHandleSubmit(index)} key={id}>
                <NavigationInput
                  className="pt-4 pb-2"
                  ref={setInputWrapperElementFromRef(index)}
                  animate={scrollDirection}
                  placeholder={`Add to ${lists[index].title ? `"${lists[index].title}"` : "list"}`}
                  onFocus={() => {
                    setActiveListIndex(index);
                    setScrollDirection("up");
                    scrollDirectionLockRef.current = true;
                    move(index, 0);
                  }}
                  onBlur={() => {
                    scrollDirectionLockRef.current = false;
                  }}
                />
              </form>
            ))}
          </motion.ul>
        }
      >
        <NavigationFooterButtons />
      </NavigationFooter>
    </div>
  );
}

function NavigationFooterButtons() {
  const { activeList } = useListContext();

  return (
    <>
      <ul className="flex justify-between gap-4 px-12 pb-4">
        <li>
          <button
            type="button"
            className="ml-auto btn btn-ghost btn-circle not-disabled:text-neutral/75 h-full w-full"
            onClick={() => {
              navigator.share({
                title: activeList.title,
                text: `Check out my Spuddy list "${activeList.title}"`,
                url: document.URL,
              });
            }}
          >
            <Share size={ICON_SIZE} />
          </button>
        </li>

        <li>
          <button
            type="button"
            className="ml-auto btn btn-ghost btn-circle not-disabled:text-neutral/75 h-full w-full"
            onClick={() => {
              navigator.share({
                title: activeList.title,
                text: `Check out my Spuddy list "${activeList.title}"`,
                url: document.URL,
              });
            }}
          >
            <Plus size={ICON_SIZE} />
          </button>
        </li>
      </ul>
    </>
  );
}
