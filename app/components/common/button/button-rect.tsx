import ButtonBase from "./button-base";

import { cn } from "@/lib/utils";

type ButtonRectProps =
  | ({
      label: string;
      className?: string;
      link: {
        href: string;
        blank?: boolean;
      };
      handleClick?: never;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      label: string;
      className?: string;
      link?: never;
      handleClick?: () => void;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

const ButtonRect = ({ label, className, ...props }: ButtonRectProps) => {
  const style = cn(
    "cursor-pointer grid outline-none place-items-center font-medium px-12 py-2 bg-foreground text-background rounded-sm w-fit border-2 border-foreground transition-[color,background] duration-400",
    "hover:bg-white hover:text-foreground",
    "focus:bg-white focus:text-foreground",
    "dark:hover:bg-background dark:focus:bg-background",
    className
  );

  if ("link" in props && props.link) {
    const { link, ...rest } = props;
    return (
      <ButtonBase link={link} className={style} {...rest}>
        {label}
      </ButtonBase>
    );
  }

  const { handleClick, ...rest } = props;
  return (
    <ButtonBase className={style} handleClick={handleClick} {...rest}>
      {label}
    </ButtonBase>
  );
};

export default ButtonRect;
