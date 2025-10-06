import { motion, type HTMLMotionProps, type MotionStyle } from "motion/react";
import {
  forwardRef,
  memo,
  useCallback,
  useState,
  type CSSProperties,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
} from "react";

import useGlobalDragging from "@hooks/use-global-dragging";

import AutoHeightTextArea from "@components/AutoHeightTextArea";

type Props = {
  id: string;
  defaultValue: string;
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  style?: CSSProperties;
  motionStyle?: MotionStyle;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (value: string) => void;
} & HTMLMotionProps<"li">;

export default memo(
  forwardRef(function ListItem(
    {
      id,
      defaultValue,
      prefix,
      onChange,
      suffix,
      className,
      children,
      disabled,
      onDragEnd,
      drag,
      motionStyle,
      dragDirectionLock,
      dragConstraints,
      dragElastic,
      wrapperClassName = "",
      ...props
    }: PropsWithChildren<Props>,
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
        layout={!globalDragging}
        ref={ref}
        className={`${wrapperClassName} relative !touch-none list-none rounded-lg`}
      >
        <motion.div
          className={`${className} textarea flex min-h-11 w-full touch-none gap-2 rounded-lg p-2 text-lg leading-0`}
          drag={drag}
          onDragEnd={onDragEnd}
          dragDirectionLock={dragDirectionLock}
          dragConstraints={dragConstraints}
          dragElastic={dragElastic}
          style={motionStyle}
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
            disabled={disabled}
            className={`${
              // there's a bug in dnd-kit/chrome that causes inputs to focus during drag
              globalDragging ? "pointer-events-none" : ""
            } bg-base-300 w-full touch-pan-y resize-none leading-normal whitespace-pre disabled:opacity-50`}
            onChange={handleChange}
            value={value}
          />
          {suffix}
        </motion.div>
        <div className="absolute top-0 left-0 -z-1 h-full w-full overflow-hidden rounded-lg">
          {children}
        </div>
      </motion.li>
    );
  }),
);
