import {Song} from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useAuthModal from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { onOpen } = useAuthModal();
  const { user } = useUser();

  return (id: string) => {
    if (!user) {
      return onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
}
export default useOnPlay;