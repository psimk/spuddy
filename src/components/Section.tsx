import { Grip } from "lucide-react";
import { forwardRef, type PropsWithChildren, type Ref } from "react";

type Props = { title: string; handleRef?: Ref<HTMLElement> };

export default forwardRef(function Section(
  { title, handleRef, children }: PropsWithChildren<Props>,
  ref: Ref<HTMLHeadingElement>,
) {
  return (
    <section className="collapse" ref={ref}>
      <input type="checkbox" defaultChecked className="peer" />
      <h2 className="collapse-title border-base-content/20 relative rounded-lg border p-2 text-center transition-all peer-checked:border-0 peer-checked:[&_span]:opacity-0">
        {title}

        <span
          ref={handleRef}
          className="absolute top-0 right-2 z-10 grid h-full cursor-move place-items-center opacity-100 transition-opacity"
        >
          <Grip />
        </span>
      </h2>

      <div className="collapse-content !p-0 !pt-2">{children}</div>
    </section>
  );
});
