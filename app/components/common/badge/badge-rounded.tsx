import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

const BadgeRounded = ({ text, className }: Props) => {
  return (
    <span
      className={cn(
        "inline-grid w-fit items-center rounded-sm border px-4 py-1",
        className
      )}
    >
      <span className="text-primary text-xs leading-none">{text}</span>
    </span>
  );
};

export default BadgeRounded;
