import { Tooltip } from "@powerhousedao/design-system/ui/components/tooltip/tooltip";

interface InfoIconProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function InfoIcon({ content, side = "top", className }: InfoIconProps) {
  return (
    <Tooltip content={content} side={side} sideOffset={6} className={className}>
      <span
        className="inline-flex items-center justify-center w-[18px] h-[18px] text-slate-400 cursor-help align-middle ml-1 transition-colors duration-150 shrink-0 hover:text-violet-500"
        aria-label="More info"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          width="14"
          height="14"
        >
          <circle cx="8" cy="8" r="6.25" />
          <path strokeLinecap="round" d="M8 7.25V11M8 5.5V5" />
        </svg>
      </span>
    </Tooltip>
  );
}
