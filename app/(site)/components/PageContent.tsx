'use client';

import {Song} from "@/types/types";
import SongCard from "@/components/SongCard";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const PageContent = ({ songs }: PageContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-gray-400">
        No songs available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mt-4">
      {
        songs.map((song) => (
          <SongCard
            key={song.id}
            onClick={(id: string) => onPlay(id)}
            song={song}
          />
        ))
      }
    </div>
  );
}
export default PageContent;