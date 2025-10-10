import { BookOpen, ChevronLeft, ChevronRight, Copy, Share } from "lucide-react";
import { useCallback, useEffect } from "react";
import { motion, type PanInfo } from "motion/react";

import useSyncedDrag from "@hooks/use-synced-drag";
import useScrollDirection from "@hooks/use-scroll-direction";

import NavigationFooter from "@components/NavigationFooter";
import NavigationInput from "@components/NavigationInput";

import { createItem } from "@services/instantdb/actions";

import ListComponent from "./List";
import { useMainContext } from "./Main";

const ICON_SIZE = 24;

export default function Main() {
  const { lists, activeListIndex, setActiveListIndex, listContent } =
    useMainContext();
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
    contentGap: 32,
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

  const scrollToBottom = () =>
    requestAnimationFrame(() => {
      currentContentElement?.firstElementChild?.lastElementChild?.previousElementSibling?.scrollIntoView(
        {
          behavior: "instant",
          block: "nearest",
        },
      );
    });

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative mx-auto w-dvw max-w-2xl flex-1 overflow-x-hidden">
        <motion.ul {...contentListProps} className="flex w-full">
          {lists.map(({ id }, index) => (
            <div key={id} className="w-full">
              <li
                ref={setContentElementFromRef(index)}
                className="h-dvh overflow-x-hidden p-4 pb-29"
              >
                <ListComponent id={id} />
              </li>
            </div>
          ))}
        </motion.ul>
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
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const formData = new FormData(event.currentTarget);

                  const item = formData.get("item")?.toString() ?? "";
                  if (!item.trim()) return;

                  event.currentTarget.reset();

                  createItem(item, id, listContent[id]);
                  scrollToBottom();
                }}
                key={id}
              >
                <NavigationInput
                  ref={setInputWrapperElementFromRef(index)}
                  animate={scrollDirection}
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
            disabled
          >
            <BookOpen size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled
          >
            <Copy size={ICON_SIZE} />
          </button>,
        ]}
      />
    </div>
  );
}
