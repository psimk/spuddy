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

import useGlobalDragging from "@shared/hooks/use-global-dragging";

import AutoHeightTextArea from "@shared/components/AutoHeightTextArea";

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
} & HTMLMotionProps<"div">;

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
      <li ref={ref} className={`${wrapperClassName} relative touch-none`}>
        <motion.div
          {...props}
          // TODO: add layout so we have a nice exit animation when deleting
          className={`${className} bg-base-200 list-row touch-pan-y rounded-none p-2 shadow-md`}
          drag={drag}
          onDragEnd={onDragEnd}
          dragDirectionLock={dragDirectionLock}
          dragConstraints={dragConstraints}
          dragElastic={dragElastic}
          style={motionStyle}
        >
          {prefix && (
            <div className="pointer-events-none flex items-center pl-4">
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
            } textarea list-col-grow textarea-ghost min-h-12 w-full touch-pan-y resize-none text-lg leading-normal whitespace-pre disabled:opacity-50`}
            onChange={handleChange}
            value={value}
          />
          {suffix}
        </motion.div>

        {!globalDragging && children}
      </li>
    );
  }),
);
