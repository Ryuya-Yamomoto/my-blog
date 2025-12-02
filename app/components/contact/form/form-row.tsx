import { cn } from "@/lib/utils";

type FormRowProps = {
  children: React.ReactNode;
  className?: string;
};

const FormRow = ({ children, className }: FormRowProps) => {
  return (
    <div
      className={cn(
        "col-span-full grid grid-cols-subgrid items-baseline justify-items-start gap-x-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormRow;
