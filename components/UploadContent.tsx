'use client';

import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useUser from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface UploadContentProps {
  songs: Song[];
}

const UploadContent = ({ songs }: UploadContentProps) => {
  const { user, subscription } = useUser();
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-gray-500" size={26} />
          <p className="text-gray-500 font-medium text-md">
            Your uploads
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={24}
          className="text-gray-500 cursor-pointer hover:text-orange-500 transition-all"
        />
      </div>
      {
        songs.length === 0 && (
          <p className="text-gray-400 pl-5 mt-5">
            No uploads from you.
          </p>
        )
      }
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
export default UploadContent;