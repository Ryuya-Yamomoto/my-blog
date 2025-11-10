import { cn } from "@/lib/utils";

type Props = {
  en: string;
  ja?: string;
};

const HeadingSection = ({ en, ja }: Props) => {
  return (
    <hgroup className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
      <h2 className="font-inter text-6xl font-bold uppercase">{en}</h2>
      {ja && (
        <span className={cn("hidden text-3xl font-medium", "md:inline")}>
          {ja}
        </span>
      )}
    </hgroup>
  );
};

export default HeadingSection;
