'use client';

import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-gray-500">
        No songs found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full px-6 justify-center">
      {
        songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between w-full"
          >
            <div className="flex-1 truncate">
              <MediaItem
                onClick={(id: string) => onPlay(id)}
                song={song}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))
      }
    </div>
  );
}
export default SearchContent;