'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";
import {FaPlay} from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    //add auth before push
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-gray-100/10 hover:bg-gray-100/20 transition-all"
    >
      <div className="relative min-h-[64px] min-w-[64px] drop-shadow-md">
        <Image
          fill
          src={image}
          alt="image"
          className="object-cover"
        />
      </div>
      <p className="font-medium truncate py-5">
        { name }
      </p>
      <div className="absolute transition-all opacity-0 rounded-full flex items-center justify-center bg-orange-500 p-10 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-105">
        <FaPlay size={20} className="text-black" />
      </div>
    </button>
  );
}
export default ListItem;