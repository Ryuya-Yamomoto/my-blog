import type { LinkButtonProps, ButtonProps } from "@/app/types/common";
import ButtonBase from "./button-base";

import { cn } from "@/lib/utils";

type ButtonTextProps = LinkButtonProps | ButtonProps;

const ButtonText = ({ label, className, ...props }: ButtonTextProps) => {
  const style = cn(
    "font-medium w-fit text-base relative pr-8",
    'before:transition-[translate] duration-400 before:content-[""] before:h-4 before:w-4 before:block before:absolute before:top-1/2 before:right-1 before:-translate-y-1/2 before:bg-[url("/images/common/icon_arrow-right.svg")] before:bg-no-repeat before:bg-center before:bg-contain',
    "hover:before:translate-x-1",
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

export default ButtonText;
