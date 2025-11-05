import { useState, type TextareaHTMLAttributes } from "react";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  maxLength?: number;
  error?: string | null
}

export const CustomTextarea = ({
  placeholder,
  maxLength = 600,
  error = null,
  ...textAreaProps
}: CustomTextareaProps) => {
   const [charCount, setCharCount] = useState(
    textAreaProps.value ? textAreaProps.value.toString().length : 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setCharCount(newValue.length);
      if (textAreaProps.onChange) {
        textAreaProps.onChange(e);
      }
    }
  };
  return (
    <div className={`textarea ${error ? "textarea--error" : ""}`}>
      <textarea
        className="textarea__field"
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        {...textAreaProps}
      />
      <span className="textarea__letters">{charCount} / {maxLength}</span>
       {error && <span className="custom-input__error">{error}</span>}
    </div>
  );
};
