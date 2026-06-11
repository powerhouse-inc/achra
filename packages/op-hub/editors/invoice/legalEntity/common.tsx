import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const FieldLabel = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => (
  <label className="block text-sm font-medium text-foreground">
    {children}
  </label>
);

export const TextInput = (props: ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className={twMerge(
        "h-10 w-full rounded-md border border-input bg-background px-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring disabled:bg-muted disabled:p-0",
        props.className,
      )}
      type="text"
    />
  );
};
