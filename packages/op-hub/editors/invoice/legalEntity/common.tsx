import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const FieldLabel = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => (
  <label className="block text-sm font-medium text-gray-700">{children}</label>
);

export const TextInput = (props: ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className={twMerge(
        "h-10 w-full rounded-md border border-gray-200 bg-white px-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:p-0",
        props.className,
      )}
      type="text"
    />
  );
};
