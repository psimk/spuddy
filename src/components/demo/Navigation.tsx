import { motion } from "motion/react";
import { BookOpen, ChevronLeft, ChevronRight, Copy, Share } from "lucide-react";

import useSyncedDrag from "@hooks/use-synced-drag";
import useScrollDirection from "@hooks/use-scroll-direction";

import NavigationFooter from "@components/NavigationFooter";
import NavigationInput from "@components/NavigationInput";

type Post = {
  id: string;
  content?: string;
};

type Props = {
  posts: ReadonlyArray<Post>;
};

const ICON_SIZE = 24;

export default function Navigation({ posts }: Props) {
  const {
    move,
    setCurrentPage,
    setContentElementFromRef,
    setInputWrapperElementFromRef,
    currentContentElement,
    inputListProps,
    contentListProps,
    currentPage,
  } = useSyncedDrag(posts.length);

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
          <motion.ul {...inputListProps} className="absolute bottom-12 flex">
            {posts.map((post, index) => (
              <NavigationInput
                key={post.id}
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
            ))}
          </motion.ul>
        }
        buttons={[
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled={currentPage === 0}
            onClick={() => {
              setCurrentPage((page) => {
                const newPage = Math.max(0, page - 1);
                move(newPage, 0);
                return newPage;
              });
            }}
          >
            <ChevronLeft size={ICON_SIZE} />
          </button>,
          <button
            type="button"
            className="btn btn-ghost btn-circle not-disabled:text-primary/75 h-full w-full"
            disabled={currentPage === posts.length - 1}
            onClick={() => {
              setCurrentPage((page) => {
                const newPage = Math.min(posts.length - 1, page + 1);
                move(newPage, 0);
                return newPage;
              });
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
