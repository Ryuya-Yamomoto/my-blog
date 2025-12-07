import ButtonBase from "./button-base";

import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonTextProps =
  | {
      label: string;
      className?: string;
      link: {
        href: string;
        blank?: boolean;
      };
      handleClick?: never;
    }
  | {
      label: string;
      className?: string;
      link?: never;
      handleClick?: () => void;
    };

const ButtonText = ({ label, className, ...props }: ButtonTextProps) => {
  const style = cn(
    "w-fit text-sm relative flex items-center gap-x-2 hover:[&>svg]:translate-x-1",
    className
  );

  if ("link" in props && props.link) {
    const { link, ...rest } = props;
    return (
      <ButtonBase link={link} className={style} {...rest}>
        {label}
        <MoveRight
          size={16}
          color="var(--foreground)"
          strokeWidth={1}
          className="duration-300"
        />
      </ButtonBase>
    );
  }

  const { handleClick, ...rest } = props;
  return (
    <ButtonBase className={style} handleClick={handleClick} {...rest}>
      {label}
      <MoveRight
        size={16}
        color="var(--foreground)"
        strokeWidth={1}
        className="duration-300"
      />
    </ButtonBase>
  );
};

export default ButtonText;
