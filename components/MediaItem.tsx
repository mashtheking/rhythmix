'use client';

import {Song} from "@/types/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem = ({ song, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(song);
  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    //TODO: Default turn on player
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || '/images/liked.png'}
          alt='album cover'
          placeholder="blur"
          blurDataURL="/images/liked.png"
          className="object-cover hover:scale-105 transition-all"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">
          { song.title }
        </p>
        <p className="text-gray-400 text-sm truncate">
          { song.author }
        </p>
      </div>
    </div>
  );
}
export default MediaItem;