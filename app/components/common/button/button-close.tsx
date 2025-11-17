import { cn } from "@/lib/utils";

type ButtonCloseProps = {
  label: string;
  handleClick: () => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonClose = ({
  label,
  handleClick,
  className,
  ...props
}: ButtonCloseProps) => {
  const style = cn(
    "h-10 w-10 bg-primary rounded-full absolute cursor-pointer -top-2 -right-2 z-1",
    className
  );

  return (
    <button
      aria-label={label}
      className={style}
      onClick={handleClick}
      {...props}
    />
  );
};

export default ButtonClose;
