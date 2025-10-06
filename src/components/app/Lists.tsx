import { BookOpen, ChevronLeft, ChevronRight, Copy, Share } from "lucide-react";
import { motion } from "motion/react";

import { id as instantId } from "@instantdb/react";

import useSyncedDrag from "@hooks/use-synced-drag";
import useScrollDirection from "@hooks/use-scroll-direction";

import NavigationFooter from "@components/NavigationFooter";
import NavigationInput from "@components/NavigationInput";

import ListComponent from "./List";

import type { List } from "@services/instantdb/types";
import { useEffect } from "react";
import db from "@services/instantdb/db";

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

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative mx-auto w-dvw max-w-2xl flex-1 overflow-x-hidden">
        <motion.ul {...contentListProps} className="flex w-full">
          {lists.map(({ id }, index) => (
            <div key={id}>
              <li
                ref={setContentElementFromRef(index)}
                className="h-dvh w-dvw overflow-y-scroll p-4 pb-8"
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
                onSubmit={async (event) => {
                  event.preventDefault();

                  const formData = new FormData(event.currentTarget);

                  const item = formData.get("item")?.toString() ?? "";
                  if (!item.trim()) return;

                  const itemId = instantId();

                  event.currentTarget.reset();

                  const { data } = await db.queryOnce({
                    items: {
                      $: {
                        where: {
                          list: id,
                          done: false,
                        },
                        order: {
                          position: "asc",
                        },
                      },
                    },
                  });

                  db.transact([
                    db.tx.items[itemId].create({
                      text: item,
                      done: false,
                      updatedAt: new Date(),
                      createdAt: new Date(),
                      position: data.items.length,
                    }),
                    db.tx.lists[id].link({ items: itemId }),
                  ]);
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
