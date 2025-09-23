import NavigationFooter from "./NavigationFooter";

type Post = {
  id: string;
  content?: string;
};

type Props = {
  posts: ReadonlyArray<Post>;
};

export default function Navigation({ posts }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto">
        <ul className="flex">
          {[posts[0]].map(({ id, content = "" }) => (
            <li
              key={id}
              className="prose h-full w-dvh max-w-2xl p-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ))}
        </ul>
      </section>
      <NavigationFooter />
    </div>
  );
}
