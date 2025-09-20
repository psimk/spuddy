import { motion, type HTMLMotionProps } from "motion/react";
import {
  forwardRef,
  memo,
  useCallback,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

import useGlobalDragging from "../hooks/useGlobalDragging";

import AutoHeightTextArea from "./AutoHeightTextArea";

type Props = {
  id: string;
  defaultValue: string;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (value: string) => void;
} & HTMLMotionProps<"li">;

export default memo(
  forwardRef(function ListItem(
    { id, defaultValue, prefix, onChange, suffix, ...props }: Props,
    ref: Ref<HTMLLIElement>,
  ) {
    const globalDragging = useGlobalDragging();
    const [value, setValue] = useState(defaultValue);

    const handleChange = useCallback((newValue: string) => {
      setValue(newValue);
      onChange?.(newValue);
    }, []);

    return (
      <motion.li
        {...props}
        ref={ref}
        className={`${props.className} textarea flex min-h-11 w-full touch-none gap-2 rounded-lg p-2 text-lg leading-0 disabled:shadow-none disabled:ring-0 disabled:outline-0`}
      >
        {prefix && (
          <div className="pointer-events-none flex items-center">
            <span className="h-6 w-6 text-center text-lg leading-6">
              {prefix}
            </span>
          </div>
        )}
        <AutoHeightTextArea
          id={id}
          className={`${
            // there's a bug in dnd-kit/chrome that causes inputs to focus during drag
            globalDragging ? "pointer-events-none" : ""
          } bg-base-300 w-full touch-pan-y resize-none leading-normal whitespace-pre`}
          onChange={handleChange}
          value={value}
        />
        {suffix}
      </motion.li>
    );
  }),
);
