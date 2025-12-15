import { cn } from "@/lib/utils";

import { X } from "lucide-react";

type ButtonCloseProps = {
  label: string;
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | (() => void);
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonClose = ({
  label,
  handleClick,
  className,
  ...props
}: ButtonCloseProps) => {
  const style = cn(
    "h-10 w-10 bg-primary rounded-full absolute cursor-pointer top-2 right-2 z-10 grid place-items-center outline-0",
    "focus-visible:ring focus-visible:ring-white",
    "disabled:opacity-30 disabled:pointer-events-none",
    className
  );

  return (
    <button
      aria-label={label}
      className={style}
      onClick={handleClick}
      {...props}
    >
      <X strokeWidth={1} size={20} color="white" />
    </button>
  );
};

export default ButtonClose;
