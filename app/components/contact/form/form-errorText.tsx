import { cn } from "@/lib/utils";

type FormErrorTextProps = {
  message: string;
  className?: string;
};

const FormErrorText = ({ message, className }: FormErrorTextProps) => {
  return (
    <p className={cn("mt-1 text-sm text-red-600", className)}>{message}</p>
  );
};

export default FormErrorText;
