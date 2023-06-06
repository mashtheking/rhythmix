'use client';

import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSong";
import PlayerContent from "@/components/PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full px-4 pb-0.5 h-20">
      <PlayerContent
        key={songUrl} //Whenever the key changes it destroys the component and re-renders it so that songs don't overlap
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
}
export default Player;