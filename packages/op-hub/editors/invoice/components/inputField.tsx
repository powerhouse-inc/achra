import { Form, StringField } from "@powerhousedao/document-engineering/scalars";
import { type ValidationResult } from "../validation/validationManager.js";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  input?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validation?: ValidationResult | null;
  className?: string;
}

export const InputField = (props: InputFieldProps) => {
  const {
    input,
    value,
    label,
    placeholder,
    onBlur,
    handleInputChange,
    validation,
    className,
  } = props;

  const warnings =
    validation && !validation.isValid ? [validation.message] : undefined;

  return (
    <Form
      defaultValues={{
        input: input,
      }}
      onSubmit={() => {}}
      resetOnSuccessfulSubmit={true}
    >
      <StringField
        label={label}
        placeholder={placeholder}
        name="input"
        value={value}
        onBlur={onBlur}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleInputChange(e);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
            // Find and focus the next focusable element
            const focusableElements = document.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            const currentIndex = Array.from(focusableElements).indexOf(
              e.currentTarget,
            );
            if (
              currentIndex > -1 &&
              currentIndex < focusableElements.length - 1
            ) {
              (focusableElements[currentIndex + 1] as HTMLElement).focus();
            }
          }
        }}
        warnings={warnings}
        className={twMerge(className)}
      />
    </Form>
  );
};
