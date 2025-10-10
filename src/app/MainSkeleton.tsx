const SKELETON_COUNT = 20;

export default function MainSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative mx-auto w-dvw max-w-2xl flex-1 overflow-x-hidden">
        <ul className="flex w-full">
          <div>
            <li className="h-dvh w-dvw overflow-y-scroll p-4 pb-8">
              <ul className="flex flex-col gap-3">
                {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                  <li key={index} className="skeleton h-11 w-full" />
                ))}
              </ul>
            </li>
          </div>
        </ul>
      </section>
    </div>
  );
}
