import { cn } from "@/lib/utils";

type FormRowProps = {
  children: React.ReactNode;
  className?: string;
};

const FormRow = ({ children, className }: FormRowProps) => {
  return (
    <div
      className={cn(
        "grid justify-items-start gap-y-2",
        "md:col-span-full md:grid-cols-subgrid md:items-baseline md:gap-x-8 md:gap-y-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormRow;
