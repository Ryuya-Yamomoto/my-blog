import WrapperContent from "./components/common/wrapper/wrapper-content";
import ButtonRect from "./components/common/button/button-rect";

const NotFound = () => {
  return (
    <WrapperContent>
      <hgroup className="mx-auto grid w-fit max-w-full place-items-center gap-y-1">
        <h2 className="font-inter text-7xl font-bold">404</h2>
        <p className="font-medium">Could not find requested resource</p>
      </hgroup>
      <ButtonRect label="TOP" link={{ href: "/" }} className="mx-auto mt-24" />
    </WrapperContent>
  );
};

export default NotFound;
