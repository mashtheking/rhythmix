'use client';

import Image from "next/image";
import {AiFillEdit} from "react-icons/ai";
import useUser from "@/hooks/useUser";
import useAvatarModal from "@/hooks/useAvatarModal";
import {useEffect} from "react";

const Avatar = () => {
  const { user, userDetails } = useUser();
  const { onOpen, avatar, setAvatar } = useAvatarModal();

  useEffect(() => {
    if (userDetails?.avatar_url) {
      setAvatar(userDetails?.avatar_url);
    }
  }, [userDetails?.avatar_url, setAvatar]);

  return (
    <div
      className="relative h-32 w-32 lg:h-44 lg:w-44 rounded-full group cursor-pointer shadow-md"
      onClick={() => {
        if (user) {
          onOpen();
        }
      }}
    >
      <Image
        fill
        src={avatar || "/images/user.svg"}
        alt="playlist"
        className={`
          object-cover rounded-full transition-all
          ${user && 'group-hover:brightness-50 group-hover:blur-sm'}
        `}
      />
      <div className={`
        hidden items-center rounded-full text-white font-bold gap-x-2 transition-all absolute w-fit h-fit inset-0 m-auto text-xl
        ${user && 'group-hover:flex'}
      `}>
        <p>Change</p>
        <AiFillEdit />
      </div>
    </div>
  );
}
export default Avatar;