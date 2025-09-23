import { forwardRef, type PropsWithChildren, type Ref } from "react";

type Props = { title: string; handleRef?: Ref<HTMLElement> };

export default forwardRef(function Section(
  { title, handleRef, children }: PropsWithChildren<Props>,
  ref: Ref<HTMLHeadingElement>,
) {
  return (
    <section ref={ref}>
      <h2 ref={handleRef} className="text-md mb-3 text-center">
        ------ {title} ------
      </h2>
      {children}
    </section>
  );
});
