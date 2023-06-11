import { Orbitron } from 'next/font/google';
import Image from "next/image";
import {twMerge} from "tailwind-merge";

const font = Orbitron({ subsets: ['latin'] });

interface BrandProps {
  className?: string;
}

const Brand = ({ className }: BrandProps) => {
  return (
    <div className={twMerge(
      font.className,
      "flex gap-x-2 items-center font-bold",
      className
    )}>
      <Image
        width={40}
        height={40}
        src="/images/logo.svg"
        alt="logo"
      />
      <h1 className="text-2xl text-orange-500">Rhythmix</h1>
    </div>
  );
}
export default Brand;
