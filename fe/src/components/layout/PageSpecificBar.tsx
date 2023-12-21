import { PropsWithChildren } from "react";

type PageSpecificBarProps = PropsWithChildren & {
  className: string;
};

const PageSpecificBar: React.FC<PageSpecificBarProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-[320px] fixed z-10 bg-zinc-100 h-full flex-shrink-0 shadow-sm  ${className}`}
    >
      {children}
    </div>
  );
};

export default PageSpecificBar;
