import { type TextareaHTMLAttributes, useLayoutEffect, useRef } from "react";

function calculateTextAreaHeight(element: HTMLTextAreaElement) {
  const text = element.value;
  const lineCount = text.split("\n").length;
  const computedStyle = getComputedStyle(element);
  const lineHeight = parseInt(computedStyle.lineHeight);
  const verticalPadding =
    parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom);

  return `${lineCount * lineHeight + verticalPadding}px`;
}

type Props = {
  onChange?: (text: string) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "style">;

/**
 * A [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) ponyfill
 */
export default function AutoHeightTextArea({ onChange, ...rest }: Props) {
  const textElementRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textElement = textElementRef.current;
    if (!textElement) return;

    textElement.style.height = calculateTextAreaHeight(textElement);
  }, []);

  return (
    <textarea
      ref={textElementRef}
      onChange={(event) => {
        const text = event.currentTarget.value;
        onChange?.(text);

        event.currentTarget.style.height = calculateTextAreaHeight(
          event.currentTarget,
        );
      }}
      {...rest}
    />
  );
}
