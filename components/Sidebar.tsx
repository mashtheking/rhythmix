'use client';

import {ReactNode} from "react";
import useRoutes from "@/hooks/useRoutes";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Playlist from "@/components/Playlist";
import {Song} from "@/types/types";
import usePlayer from "@/hooks/usePlayer";
import {twMerge} from "tailwind-merge";

interface SidebarProps {
  children: ReactNode;
  songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
  const routes = useRoutes();
  const player = usePlayer();

  return (
    <div className={twMerge(
      "flex h-full",
      player.activeId && "h-[calc(100%-80px)]"
    )}>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-80 p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {
              routes.map((item) => (
                <SidebarItem
                  key={item.label}
                  { ...item }
                />
              ))
            }
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Playlist songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        { children }
      </main>
    </div>
  );
}
export default Sidebar;