import { motion, type PanInfo } from "motion/react";
import { BookOpen, ChevronLeft, ChevronRight, Copy, Share } from "lucide-react";
import { useCallback, useState } from "react";

import useSyncedDrag from "@shared/hooks/use-synced-drag";
import useScrollDirection from "@shared/hooks/use-scroll-direction";
import NavigationFooter from "@shared/components/NavigationFooter";
import NavigationInput from "@shared/components/NavigationInput";

type Post = {
  id: string;
  content?: string;
};

type Props = {
  posts: ReadonlyArray<Post>;
};

const ICON_SIZE = 24;

export default function Navigation({ posts }: Props) {
  const [activeListIndex, setActiveListIndex] = useState(0);

  const {
    move,
    setContentElementFromRef,
    setInputWrapperElementFromRef,
    contentElements,
    inputListProps,
    contentListProps,
  } = useSyncedDrag({
    listLength: posts.length,
    inputWrapperGap: 16,
    contentGap: 32,
  });

  const listLength = posts.length;

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

  const currentContentElement = contentElements[activeListIndex] ?? null;

  const { scrollDirection, setScrollDirection, scrollDirectionLockRef } =
    useScrollDirection(currentContentElement);

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative mx-auto w-dvw max-w-2xl flex-1 overflow-x-hidden">
        <motion.ul {...contentListProps} className="flex w-full">
          {posts.map(({ id, content = "" }, index) => (
            <div key={id}>
              <li
                ref={setContentElementFromRef(index)}
                className="prose bg-base-100 h-dvh w-dvw overflow-y-scroll p-4 pb-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
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
            {posts.map((post, index) => (
              <NavigationInput
                key={post.id}
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
            ))}
          </motion.ul>
        }
        buttons={[
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled={activeListIndex === 0}
            onClick={() => {
              const newPage = Math.max(0, activeListIndex - 1);
              move(newPage, 0);
              setActiveListIndex(newPage);
            }}
          >
            <ChevronLeft size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled={activeListIndex === posts.length - 1}
            onClick={() => {
              const newPage = Math.min(posts.length - 1, activeListIndex + 1);
              move(newPage, 0);
              setActiveListIndex(newPage);
            }}
          >
            <ChevronRight size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
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
