import { Grip } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";

type Props = {
  id: string;
  defaultValue: string;
  prefix?: ReactNode;
  onChange?: (value: string) => void;
};

export default function SmartSuffixListItem({
  id,
  defaultValue,
  prefix,
  onChange,
}: Props) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  }, []);

  return (
    <li className="textarea flex min-h-11 w-full gap-2 rounded-lg p-2 text-lg leading-0">
      {prefix && (
        <div className="pointer-events-none flex items-center">
          <span className="h-6 w-6 text-center text-lg">{prefix}</span>
        </div>
      )}
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
