import {
  DatePickerField,
  Form,
} from "@powerhousedao/document-engineering/scalars";
import { twMerge } from "tailwind-merge";
interface DatePickerProps {
  name: string;
  value: string | null | undefined;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker = (props: DatePickerProps) => {
  return (
    <Form
      key={props.value}
      defaultValues={{
        input: props.value,
      }}
      onSubmit={() => {}}
      resetOnSuccessfulSubmit={false}
    >
      <DatePickerField
        name={props.name}
        value={props.value || ""}
        label={props.label}
        placeholder={props.placeholder}
        onChange={props.onChange}
        dateFormat={"YYYY-MM-DD"}
        className={twMerge(props.className)}
      />
    </Form>
  );
};
