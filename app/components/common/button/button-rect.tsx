import type { LinkButtonProps, ButtonProps } from "@/app/types/common";
import ButtonBase from "./button-base";

import { cn } from "@/lib/utils";

type ButtonRectProps = LinkButtonProps | ButtonProps;

const ButtonRect = ({ label, className, ...props }: ButtonRectProps) => {
  const style = cn(
    "grid place-items-center font-medium px-12 py-2 bg-primary text-white rounded-sm w-fit border-2 border-primary transition-[color,background] duration-400",
    "hover:bg-white hover:text-primary",
    className
  );

  if ("link" in props && props.link) {
    const { link, ...rest } = props;
    return <ButtonBase label={label} link={link} className={style} {...rest} />;
  }

  const { handleClick, ...rest } = props;
  return (
    <ButtonBase
      label={label}
      className={style}
      handleClick={handleClick}
      {...rest}
    />
  );
};

export default ButtonRect;
