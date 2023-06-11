'use client';

import {useRouter} from "next/navigation";
import {AiFillHeart} from "react-icons/ai";
import {BsArrowRightCircleFill} from "react-icons/bs";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = ({ name, href }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden shadow-md gap-x-4 bg-gray-900/10 hover:bg-gray-700/20 transition-all"
    >
      <div className="relative min-h-[64px] min-w-[64px] drop-shadow-md flex items-center group">
        <div className="absolute transition-all flex items-center justify-center bg-gradient-to-br from-orange-500 to-purple-500 p-10 px-5">
          <AiFillHeart size={24} className="text-white h-full w-full" />
        </div>
      </div>
      <div className="flex justify-between items-center w-full pr-7 group">
        <p className="font-medium truncate py-5">
          { name }
        </p>
        <p className="group-hover:translate-x-2 transition-all text-gray-900">
          <BsArrowRightCircleFill size={20}/>
        </p>
      </div>

    </button>
  );
}
export default ListItem;