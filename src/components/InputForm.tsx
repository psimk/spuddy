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
    <form
      action={action}
      className={cn(
        "rounded-box bg-base-100/90 p-4 drop-shadow-xl backdrop-blur-2xl",
        formClassName,
      )}
    >
      <input
        type="text"
        className={cn(className, "h-6 flex-1 outline-none")}
        {...props}
      />
    </form>
  );
}
