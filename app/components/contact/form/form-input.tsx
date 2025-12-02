import { cn } from "@/lib/utils";

import FormErrorText from "./form-errorText";

type FormInputProps = {
  errorMsg?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ errorMsg = "", className, ...rest }: FormInputProps) => {
  return (
    <div className="w-full">
      <input
        {...rest}
        className={cn("onFocus w-full rounded-sm border px-4 py-4", className)}
      />
      {errorMsg !== "" && <FormErrorText message={errorMsg} />}
    </div>
  );
};

export default FormInput;
