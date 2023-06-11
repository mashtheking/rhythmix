import {IconType} from "react-icons";
import Link from "next/link";
import {twMerge} from "tailwind-merge";
import useUser from "@/hooks/useUser";

interface SidebarItemProps {
  icons: IconType[];
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem = ({ icons, label, active, href }: SidebarItemProps) => {
  const Icon = icons[active ? 1 : 0];
  const { user } = useUser();

  if (!user && href === "/upload") {
    return null;
  }

  return (
    <Link
      href={href}
      className={twMerge(
        "flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-orange-500 transition-all text-gray-500 py-1",
        active && "text-gray-900"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">
        { label }
      </p>
    </Link>
  );
}
export default SidebarItem;