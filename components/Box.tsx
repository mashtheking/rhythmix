import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <div className={twMerge(
      "bg-gray-200 rounded-lg w-full",
      className
    )}>
      { children }
    </div>
  );
}
export default Box;