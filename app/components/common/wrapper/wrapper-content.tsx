import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const WrapperContent = ({ className, children }: Props) => {
  return (
    <div className={cn("mx-auto w-full max-w-300 px-4", className)}>
      {children}
    </div>
  );
};

export default WrapperContent;
