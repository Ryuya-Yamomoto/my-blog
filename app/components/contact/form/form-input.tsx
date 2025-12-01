import { cn } from "@/lib/utils";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = (props: FormInputProps) => {
  const { className, ...rest } = props;

  return (
    <input
      {...rest}
      className={cn(
        "w-full rounded-sm border px-4 py-4 outline-none",
        className
      )}
    />
  );
};

export default FormInput;
