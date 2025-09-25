import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

import NavigationFooter from "./NavigationFooter";

type Post = {
  id: string;
  content?: string;
};

type Props = {
  posts: ReadonlyArray<Post>;
};

export default function Navigation({ posts }: Props) {
  const x = useMotionValue(0);
  const scrollContainerRef = useRef<HTMLLIElement | null>(null);

  // TODO: don't use hard-coded values :)
  const adjustedX = useTransform(x, [-1408, 0], [-(posts.length - 1) * 414, 0]);

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative mx-auto w-full max-w-2xl flex-1 overflow-x-hidden">
        <motion.ul style={{ x: adjustedX }} className="flex w-full">
          {posts.map(({ id, content = "" }, index) => (
            <div key={id}>
              <li
                ref={
                  // TODO: set all refs in an array, and dynamically select the correct container for the footer
                  index === 0 ? scrollContainerRef : () => {}
                }
                className="prose h-dvh w-dvw overflow-y-scroll p-4 pb-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          ))}
        </motion.ul>
      </section>
      <NavigationFooter x={x} scrollContainer={scrollContainerRef} />
    </div>
  );
}
