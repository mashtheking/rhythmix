import {IconType} from "react-icons";
import Link from "next/link";
import {twMerge} from "tailwind-merge";

interface SidebarItemProps {
  icons: IconType[];
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem = ({ icons, label, active, href }: SidebarItemProps) => {
  const Icon = icons[active ? 1 : 0];

  return (
    <Link
      href={href}
      className={twMerge(
        "flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition-all text-gray-400 py-1",
        active && "text-white"
      )}
    >
      <Icon size={26}/>
      <p className="truncate w-full">
        { label }
      </p>
    </Link>
  );
}
export default SidebarItem;