import {FaPlay} from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="group transition opacity-0 rounded-full flex items-center bg-orange-400 p-4 shadow-md translate translate-y-1/4 hover:scale-105 group-hover:opacity-100 group-hover:translate-y-0">
      <FaPlay className="text-gray-900 group-hover:scale-105"/>
    </button>
  );
}
export default PlayButton;
