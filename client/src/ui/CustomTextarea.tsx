import { useState, type TextareaHTMLAttributes } from "react";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CustomTextarea = ({
  placeholder,
  maxLength = 600,
  value = "",
  onChange,
  ...textAreaProps
}: CustomTextareaProps) => {
  const [charCount, setCharCount] = useState(value.length);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setCharCount(newValue.length);
      if (onChange) {
        onChange(e);
      }
    }
  };
  return (
    <div className="textarea">
      <textarea
        className="textarea__field"
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        {...textAreaProps}
      />
      <span className="textarea__letters">{charCount} / {maxLength}</span>
    </div>
  );
};
