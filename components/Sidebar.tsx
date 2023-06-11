'use client';

import {ReactNode} from "react";
import useSidebarRoutes from "@/hooks/useSidebarRoutes";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import UploadContent from "@/components/UploadContent";
import {Song} from "@/types";
import usePlayer from "@/hooks/usePlayer";
import {twMerge} from "tailwind-merge";
import Brand from "@/components/Brand";

interface SidebarProps {
  children: ReactNode;
  songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
  const routes = useSidebarRoutes();
  const player = usePlayer();

  return (
    <div className={twMerge(
      "flex h-full",
      player.activeId && "h-[calc(100%-80px)]"
    )}>
      <div className="hidden md:flex flex-col gap-y-2 h-full w-80 p-2">
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
        <Box className="overflow-y-auto h-full relative flex flex-col">
          <div className="flex-grow">
            <UploadContent songs={songs} />
          </div>
          <div className="sticky bottom-0 bg-gray-200 w-full rounded-lg">
            <Brand className="py-3 justify-center"/>
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto md:py-2 md:pr-2">
        { children }
      </main>
    </div>
  );
}
export default Sidebar;