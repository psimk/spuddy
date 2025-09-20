import { Grip } from "lucide-react";
import ListItem from "./ListItem";

type Product = {
  id: string;
  emoji: string;
  variants: { en: ReadonlyArray<string>; lt: ReadonlyArray<string> };
};

type Props = Product;

export default function DragOverlayListItem({ id, emoji, variants }: Props) {
  return (
    <ListItem
      id={id}
      prefix={emoji}
      defaultValue={variants.en[0] || ""}
      initial={{ scale: 1, boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
      animate={{
        scale: 1.05,
        boxShadow: "0 10px 10px #00000040",
      }}
      suffix={
        <div className="flex h-auto cursor-grab items-center justify-center">
          <Grip />
        </div>
      }
    />
  );
}
