// import { cn } from "@/lib/utils";

type Props = {
  en: string;
  ja?: string;
};

const HeadingSection = ({ en, ja }: Props) => {
  return (
    <hgroup className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
      <h2 className="text-6xl font-bold">{en}</h2>
      {ja && <span className="text-3xl font-medium">{ja}</span>}
    </hgroup>
  );
};

export default HeadingSection;
