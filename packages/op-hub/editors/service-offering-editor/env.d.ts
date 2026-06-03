declare module "*.css" {}

declare module "@powerhousedao/design-system/ui/components/tooltip/tooltip" {
  import type { ReactNode } from "react";

  export interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    triggerAsChild?: boolean;
    className?: string;
  }

  export function Tooltip(props: TooltipProps): ReactNode;
  export function TooltipProvider(props: { children: ReactNode }): ReactNode;
}
