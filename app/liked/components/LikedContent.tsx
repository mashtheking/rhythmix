'use client';

import {Song} from "@/types";
import useUser from "@/hooks/useUser";
import {useEffect} from "react";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import useAuthModal from "@/hooks/useAuthModal";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent = ({ songs }: LikedContentProps) => {
  const { isLoading, user } = useUser();
  const { onOpen } = useAuthModal();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      onOpen();
    }
  }, [isLoading, user]);

  if (!isLoading && !user) {
    return (
      <div className="flex gap-y-2 w-full px-6 text-gray-500 justify-center md:justify-start">
        Login to view your liked songs.
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="flex gap-y-2 w-full px-6 text-gray-500 justify-center md:justify-start">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full p-6">
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
export default LikedContent;