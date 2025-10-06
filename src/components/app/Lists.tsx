import { BookOpen, ChevronLeft, ChevronRight, Copy, Share } from "lucide-react";
import { motion } from "motion/react";

import useSyncedDrag from "@hooks/use-synced-drag";
import useScrollDirection from "@hooks/use-scroll-direction";

import NavigationFooter from "@components/NavigationFooter";
import NavigationInput from "@components/NavigationInput";

import ListComponent from "./List";

import type { List } from "@services/instantdb/types";
import { useEffect } from "react";
import { createItem } from "@services/instantdb/actions";

const ICON_SIZE = 24;

type Props = {
  lists: ReadonlyArray<List>;
};

export default function Main({ lists }: Props) {
  const {
    move,
    setCurrentPage,
    setContentElementFromRef,
    setInputWrapperElementFromRef,
    currentContentElement,
    inputListProps,
    contentListProps,
    currentPage,
  } = useSyncedDrag(lists.length);

  useEffect(() => {
    const list = lists[currentPage];
    if (!list) return;

    document.title = `Spuddy | ${list.title}`;
  }, [currentPage, lists]);

  const { scrollDirection, setScrollDirection, scrollDirectionLockRef } =
    useScrollDirection(currentContentElement);

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
          <motion.ul {...inputListProps} className="absolute bottom-12 flex">
            {lists.map(({ id }, index) => (
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const formData = new FormData(event.currentTarget);

                  const item = formData.get("item")?.toString() ?? "";
                  if (!item.trim()) return;

                  event.currentTarget.reset();

                  createItem(item, id).finally(() => {
                    scrollToBottom();
                  });
                }}
                key={id}
              >
                <NavigationInput
                  ref={setInputWrapperElementFromRef(index)}
                  animate={scrollDirection}
                  onFocus={() => {
                    setCurrentPage(index);
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
