'use client';

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";
import {Audio} from "react-loader-spinner";
import usePlayer from "@/hooks/usePlayer";

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void
}

const SongCard = ({ song, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(song)
  const { activeId, isPlaying } = usePlayer();

  return (
    <div
      onClick={() => onClick(song.id)}
      className="relative group flex flex-col items-center justify-center shadow-md rounded-md overflow-hidden gap-x-4 bg-gray-900/10 cursor-pointer hover:bg-gray-700/20 transition-all p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          fill
          src={imagePath || '/images/liked.png'}
          alt='album cover'
          placeholder="blur"
          blurDataURL="/images/song.svg"
          className={`
            object-cover transition-all
            ${ (activeId === song.id && isPlaying) ? 'brightness-50' : 'group-hover:scale-105' }
          `}
        />
        <div className={`
          items-center text-white font-bold gap-x-2 transition-all drop-shadow-md absolute w-fit h-fit inset-0 m-auto text-xl
          ${ (activeId === song.id && isPlaying) ? 'flex' : 'hidden' }
        `}>
          <Audio
            height="70"
            width="70"
            color="#f97316"
            ariaLabel="audio-playing"
            visible={true}
          />
        </div>
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {song.title}
        </p>
        <p className="text-gray-500 text-sm pb-4 w-full truncate">
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