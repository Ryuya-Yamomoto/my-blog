import { cn } from "@/lib/utils";
import Image from "next/image";

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
    "h-10 w-10 bg-primary rounded-full absolute cursor-pointer top-2 right-2 z-10 grid place-items-center",
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
      <Image
        src="/images/common/icon_cross.svg"
        alt="閉じる"
        width={20}
        height={20}
      />
    </button>
  );
};

export default ButtonClose;
