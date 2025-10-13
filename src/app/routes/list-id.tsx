import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Copy,
  Minus,
  Plus,
  Share,
} from "lucide-react";
import { useCallback, useEffect } from "react";
import { motion, type PanInfo } from "motion/react";

import useSyncedDrag from "@shared/hooks/use-synced-drag";
import useScrollDirection from "@shared/hooks/use-scroll-direction";

import NavigationFooter from "@shared/components/NavigationFooter";
import NavigationInput from "@shared/components/NavigationInput";

import {
  createItem,
  createList,
  removeList,
} from "@app/services/instantdb/actions";
import { useListContext } from "@app/contexts/list-context";
import ListComponent from "@app/components/List";

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

  useEffect(() => {
    const list = lists[activeListIndex];
    if (!list) return;

    document.title = `Spuddy | ${list.title}`;
  }, [activeListIndex, lists]);

  const currentContentElement = contentElements[activeListIndex] ?? null;

  const { scrollDirection, setScrollDirection, scrollDirectionLockRef } =
    useScrollDirection(currentContentElement);

  const listLength = lists.length;

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
        buttons={[
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled
          >
            <ChevronLeft size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled
          >
            <ChevronRight size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled
            onClick={() => {
              navigator.share?.({
                title: document.title,
                text: currentContentElement?.innerText,
                url: window.location.href,
              }) ?? alert("Share is not supported on this browser.");
            }}
          >
            <Share size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            onClick={() => {
              createList();
            }}
          >
            <Plus size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            onClick={() => {
              removeList(lists[activeListIndex].id);
            }}
          >
            <Minus size={ICON_SIZE} />
          </button>,
        ]}
      />
    </div>
  );
}
