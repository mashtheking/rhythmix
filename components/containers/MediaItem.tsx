'use client';

import {Song} from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem = ({ song, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(song);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    return player.setId(song.id);
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-300 w-full p-2 rounded-md group"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || '/images/liked.png'}
          alt='album cover'
          placeholder="blur"
          blurDataURL="/placeholders/song.svg"
          className="object-cover group-hover:scale-105 transition-all"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-gray-900 truncate">
          { song.title }
        </p>
        <p className="text-gray-500 text-sm truncate">
          { song.author }
        </p>
      </div>
    </div>
  );
}
export default MediaItem;