'use client';

import {Song} from "@/types";
import SongCard from "@/components/containers/SongCard";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const PageContent = ({ songs }: PageContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex justify-center md:justify-start mt-4 text-gray-600">
        No songs available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-4">
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