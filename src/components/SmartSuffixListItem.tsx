import Fuse from "fuse.js";
import { Grip } from "lucide-react";
import { useCallback, useState } from "react";

type Product = {
  emoji: string;
  variants: { en: ReadonlyArray<string>; lt: ReadonlyArray<string> };
};

type Props = {
  id: string;
  products: ReadonlyArray<Product>;
};

function findClosestEmoji(
  value: string,
  products: ReadonlyArray<Product>,
): string | null {
  const fuse = new Fuse(products, {
    includeScore: true,
    keys: ["variants.en", "variants.lt"],
    isCaseSensitive: true,
    ignoreDiacritics: true,
  });

  const [result, ...restResults] = fuse.search(value);

  console.log({ result, restResults });

  return result?.item.emoji ?? null;
}

export default function SmartSuffixListItem({ id, products }: Props) {
  const [value, setValue] = useState("");
  const [prefix, setPrefix] = useState<string | null>(null);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);

      if (newValue.trim() === "") {
        setPrefix(null);
        return;
      }

      const closestEmoji = findClosestEmoji(newValue, products);
      setPrefix(closestEmoji);
    },
    [products],
  );

  console.log({ prefix });

  return (
    <li className="textarea flex min-h-11 w-full gap-2 rounded-lg p-2 text-lg leading-0">
      <div className="pointer-events-none flex items-center">
        <span className="text-lg w-6 h-6 text-center">{prefix}</span>
      </div>
      <textarea
        id={id}
        className="bg-base-300 field-sizing-content w-full resize-none leading-normal"
        onChange={(event) => handleChange(event.target.value)}
        value={value}
      />
      <div className="justfiy-center pointer-events-none flex h-auto items-center">
        <Grip />
      </div>
    </li>
  );
}
