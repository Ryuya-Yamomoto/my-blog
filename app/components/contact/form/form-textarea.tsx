import { cn } from "@/lib/utils";

import FormErrorText from "./form-errorText";

type FormTextareaProps = {
  errorMsg?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextarea = ({ errorMsg, className, ...rest }: FormTextareaProps) => {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          "onFocus min-h-40 w-full rounded-sm border px-4 py-4 leading-[2]",
          errorMsg && "border-red-500/70",
          className
        )}
        {...rest}
      />
      {errorMsg && <FormErrorText message={errorMsg} />}
    </div>
  );
};

export default FormTextarea;
