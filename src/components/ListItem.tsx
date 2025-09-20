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
    const [value, setValue] = useState(defaultValue);

    const handleChange = useCallback((newValue: string) => {
      setValue(newValue);
      onChange?.(newValue);
    }, []);

    return (
      <motion.li
        ref={ref}
        {...props}
        className={`${props.className} textarea flex min-h-11 w-full touch-none gap-2 rounded-lg p-2 text-lg leading-0 data-dragging:shadow-none data-dragging:ring-0 data-dragging:outline-0`}
      >
        {prefix && (
          <div className="pointer-events-none flex items-center">
            <span className="h-6 w-6 text-center text-lg leading-6">
              {prefix}
            </span>
          </div>
        )}
        <textarea
          id={id}
          className="bg-base-300 field-sizing-content w-full resize-none leading-normal"
          onChange={(event) => handleChange(event.target.value)}
          value={value}
        />
        {suffix}
      </motion.li>
    );
  }),
);
