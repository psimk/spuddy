import Fuse from "fuse.js";
import { useCallback, useState, type ComponentProps } from "react";

import ListItem from "@shared/components/ListItem";

type Product = {
  emoji: string;
  variants: { en: ReadonlyArray<string>; lt: ReadonlyArray<string> };
};

type Props = Omit<
  ComponentProps<typeof ListItem>,
  "prefix" | "defaultValue" | "onChange"
> & {
  products: ReadonlyArray<Product>;
};

const DEFAULT_EMOJI = "❓";

function findClosestEmoji(
  value: string,
  products: ReadonlyArray<Product>,
): string | null {
  const fuse = new Fuse(products, {
    includeScore: true,
    keys: ["variants.en", "variants.lt"],
    isCaseSensitive: true,
    ignoreDiacritics: true,
    threshold: 0.3,
  });

  const [result] = fuse.search(value);

  return result?.item.emoji ?? null;
}

export default function SmartSuffixListItem({ products, ...props }: Props) {
  const [prefix, setPrefix] = useState<string>(DEFAULT_EMOJI);

  const handleChange = useCallback(
    (newValue: string) => {
      if (newValue.trim() === "") {
        setPrefix(DEFAULT_EMOJI);
        return;
      }

      const closestEmoji = findClosestEmoji(newValue, products);
      setPrefix(closestEmoji ?? DEFAULT_EMOJI);
    },
    [products],
  );

  return (
    <ListItem
      prefix={prefix}
      defaultValue=""
      onChange={handleChange}
      {...props}
    />
  );
}
