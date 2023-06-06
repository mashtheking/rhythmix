'use client';

import { Song } from "@/types/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void
}

const SongCard = ({ song, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(song)
  return (
    <div
      onClick={() => onClick(song.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-gray-400/5 cursor-pointer hover:bg-gray-400/10 transition-all p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          fill
          src={imagePath || '/images/liked.png'}
          alt='album cover'
          placeholder="blur"
          blurDataURL="/images/liked.png"
          className="object-cover hover:scale-105 transition-all"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {song.title}
        </p>
        <p className="text-gray-400 text-sm pb-4 w-full truncate">
          By {song.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
}
export default SongCard;