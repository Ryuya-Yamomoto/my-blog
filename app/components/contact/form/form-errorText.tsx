import { cn } from "@/lib/utils";

type FormErrorTextProps = {
  message: string;
  className?: string;
};

const FormErrorText = ({ message, className }: FormErrorTextProps) => {
  return (
    <p className={cn("text-sm text-red-600 md:mt-1", className)}>{message}</p>
  );
};

export default FormErrorText;
