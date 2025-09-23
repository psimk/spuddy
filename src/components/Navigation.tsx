type Website = {
  id: string;
  url: string;
};

type Props = {
  websites: ReadonlyArray<Website>;
};

export default function Navigation({ websites }: Props) {
  return <code>{JSON.stringify(websites, null, 2)}</code>;
}
