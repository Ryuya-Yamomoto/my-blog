import type { LinkButtonProps, ButtonProps } from "@/app/types/common";
import ButtonBase from "./button-base";

import { cn } from "@/lib/utils";

type ButtonTextProps = LinkButtonProps | ButtonProps;

const ButtonText = ({ label, className, ...props }: ButtonTextProps) => {
  const style = cn(className);

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
