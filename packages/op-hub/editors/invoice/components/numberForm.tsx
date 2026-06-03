import { Form, NumberField } from "@powerhousedao/document-engineering/scalars";
import { twMerge } from "tailwind-merge";

interface NumberFormProps {
  number: number | string;
  precision?: number;
  min?: number;
  max?: number;
  pattern?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const NumberForm = ({
  number,
  precision,
  handleInputChange,
  placeholder,
  className,
}: NumberFormProps) => {
  return (
    <Form
      defaultValues={{ number }}
      onSubmit={() => {}}
      resetOnSuccessfulSubmit
    >
      <NumberField
        name="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleInputChange(e);
        }}
        precision={precision}
        value={
          typeof number === "string" && number === "-" ? 0 : Number(number)
        }
        placeholder={placeholder}
        className={twMerge(className)}
      />
    </Form>
  );
};
