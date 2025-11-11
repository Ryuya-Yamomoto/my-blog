import { cn } from "@/lib/utils";

type Props = {
  en: string;
  ja?: string;
  notShowJa?: boolean;
};

const HeadingSection = ({ en, ja, notShowJa = false }: Props) => {
  return (
    <hgroup
      className={cn(
        "flex flex-wrap items-baseline gap-x-4 gap-y-2",
        "md:gap-x-8"
      )}
    >
      <h2 className="font-inter text-6xl font-bold uppercase">{en}</h2>
      {ja && (
        <span
          className={cn(
            "inline text-xl font-medium md:text-3xl",
            notShowJa && "hidden md:inline"
          )}
        >
          {ja}
        </span>
      )}
    </hgroup>
  );
};

export default HeadingSection;
