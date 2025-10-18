import { Grip } from "lucide-react";
import { type PropsWithChildren, type Ref, forwardRef } from "react";

type Props = { title: string; handleRef?: Ref<HTMLElement> };

export default forwardRef(function Section(
  { title, handleRef, children }: PropsWithChildren<Props>,
  ref: Ref<HTMLHeadingElement>,
) {
  return (
    <section className="bg-base-200 collapse py-4 shadow-sm" ref={ref}>
      <input type="checkbox" defaultChecked className="peer" />
      <h2 className="collapse-title border-base-content/20 relative rounded-lg p-2 text-center font-bold transition-all peer-checked:border-0 peer-checked:[&_span]:pointer-events-none peer-checked:[&_span]:opacity-0">
        {title}

        <span
          ref={handleRef}
          className="absolute top-0 right-3 z-10 grid h-full cursor-move place-items-center opacity-100 transition-opacity"
        >
          <Grip />
        </span>
      </h2>

      <div className="collapse-content !p-0 peer-checked:!pt-2">{children}</div>
    </section>
  );
});
