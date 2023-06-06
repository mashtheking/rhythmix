'use client';

import {Song} from "@/types/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import {BsPauseFill, BsPlayFill} from "react-icons/bs";
import {AiFillStepBackward, AiFillStepForward} from "react-icons/ai";
import Slider from "@/components/Slider";
import usePlayer from "@/hooks/usePlayer";
import {useEffect, useState} from "react";
import {ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute, ImVolumeMute2} from "react-icons/im";
import useSound from "use-sound";
import SeekSlider from "@/components/SeekSlider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const PlayPauseIcon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? ImVolumeMute2 : volume <= 0.2 ? ImVolumeMute : volume <= 0.4 ? ImVolumeLow : volume <= 0.7 ? ImVolumeMedium : ImVolumeHigh;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[(currentIndex + 1) % player.ids.length];

    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[((currentIndex - 1) + player.ids.length) % player.ids.length];

    player.setId(prevSong);
  }

  //This is the hook because of which we had to add key prop to PlayerContent because it can't handle dynamic url
  const [play, { pause, duration, sound }] = useSound(
    songUrl,
    {
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3']
    }
  );

  const [time, setTime] = useState({
    min: "00", sec: "00"
  });
  const [currTime, setCurrTime] = useState({
    min: "00", sec: "00"
  });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: isNaN(min) ? "00" : min.toString().padStart(2, '0'),
        sec: isNaN(sec) ? "00" : secRemain.toString().padStart(2, '0')
      });
    }
  }, [isPlaying, duration, setTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min: isNaN(min) ? "00" : min.toString().padStart(2, '0'),
          sec: isNaN(sec) ? "00" : sec.toString().padStart(2, '0')
        });
      }
    }, 1000);
    return () => {
      sound?.unload();
      clearInterval(interval)
    };
  }, [sound, setSeconds, setCurrTime]);

  useEffect(() => {
    sound?.play();
    return () => sound?.unload();
  }, [sound]);

  //Player controls
  const togglePlayPause = () => isPlaying ? pause() : play();
  const toggleMute = () => volume === 0 ? setVolume(1) : setVolume(0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full items-center">
      <div className="flex w-full justify-start items-center">
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <MediaItem song={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="h-fit flex flex-col justify-end md:justify-center items-center w-full max-w-3xl gap-y-2">
        <div className="flex flex-col gap-y-0.5 h-fit">
          <div className="flex justify-between text-xs text-gray-400">
            <p>
              {currTime.min}:{currTime.sec}
            </p>
            <p>
              {time.min}:{time.sec}
            </p>
          </div>
          <SeekSlider
            max={duration ? duration / 1000 : 0}
            value={seconds}
            onChange={(value) => sound.seek([value])}
          />
        </div>

        <div className="flex flex-row justify-center items-center gap-x-6 h-fit">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-gray-400 cursor-pointer hover:text-white transition-all"
          />
          <div
            onClick={togglePlayPause}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          >
            <PlayPauseIcon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-gray-400 cursor-pointer hover:text-white transition-all"
          />
        </div>
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-32">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          />
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
}
export default PlayerContent;