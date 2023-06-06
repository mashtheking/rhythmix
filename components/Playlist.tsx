'use client';

import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useUser from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import {Song} from "@/types/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PlaylistProps {
  songs: Song[];
}

const Playlist = ({ songs }: PlaylistProps) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    //TODO: Check for subscription
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-gray-400" size={26} />
          <p className="text-gray-400 font-medium text-md">
            Your Playlist
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-gray-400 cursor-pointer hover:text-white transition-all"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {
          songs.map((song) => (
            <MediaItem
              key={song.id}
              onClick={(id: string) => onPlay(id)}
              song={song}
            />
          ))
        }
      </div>
    </div>
  );
}
export default Playlist;