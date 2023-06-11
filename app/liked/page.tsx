import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import LikedContent from "@/app/liked/components/LikedContent";
import {AiFillHeart} from "react-icons/ai";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div className="bg-gray-200 md:rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative rounded-lg h-44 w-44 bg-gradient-to-br from-orange-500 to-purple-500 shadow-md">
              <AiFillHeart size={72} className="absolute text-white inset-0 m-auto" />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-medium text-sm text-gray-700">
                Playlist
              </p>
              <h1 className="text-gray-900 text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
}
export default Liked;