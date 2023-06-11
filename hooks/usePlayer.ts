import {create} from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id}),
  setIds: (ids: string[]) => set({ ids: ids }),
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;