"use client";

import type { LinkButtonProps, ButtonProps } from "@/app/types/common";
import Link from "next/link";

type ButtonBaseProps = LinkButtonProps | ButtonProps;

const ButtonBase = ({ label, className, ...props }: ButtonBaseProps) => {
  if ("link" in props && props.link) {
    const { link, ...rest } = props;
    return (
      <Link
        href={link.href}
        target={link.blank ? "_blank" : ""}
        className={className}
        {...rest}
      >
        {label}
      </Link>
    );
  }

  const { handleClick, ...rest } = props;
  return (
    <button onClick={handleClick} className={className} {...rest}>
      {label}
    </button>
  );
};

export default ButtonBase;
