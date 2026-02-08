import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@utils/cn";

type Props = {
  action?: (formData: FormData) => void;
  formClassName?: string;
} & ComponentPropsWithoutRef<"input">;

export default function InputForm({
  action,
  formClassName,
  className,
  ...props
}: Props) {
  return (
    <form action={action} className={cn("flex p-4", formClassName)}>
      <input
        type="text"
        className={cn(className, "h-6 flex-1 outline-none")}
        {...props}
      />
    </form>
  );
}
