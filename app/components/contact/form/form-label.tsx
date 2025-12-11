import { cn } from "@/lib/utils";

type FormLabelProps = {
  required?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const FormLabel = (props: FormLabelProps) => {
  const { className, required, ...rest } = props;

  return (
    <label
      className={cn(
        required &&
          "relative before:absolute before:-right-2 before:text-red-600 before:content-['*']",
        className
      )}
      {...rest}
    />
  );
};

export default FormLabel;
