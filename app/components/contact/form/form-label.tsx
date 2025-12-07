import { cn } from "@/lib/utils";

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const FormLabel = (props: FormLabelProps) => {
  const { className, ...rest } = props;

  return <label className={cn("", className)} {...rest} />;
};

export default FormLabel;
