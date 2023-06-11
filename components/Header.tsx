'use client';

import {ReactNode, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {AiOutlineHome, AiOutlineSearch} from "react-icons/ai";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useUser from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import useAvatarModal from "@/hooks/useAvatarModal";
import Image from "next/image";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const { avatar, setAvatar } = useAvatarModal();
  const supabaseClient = useSupabaseClient();
  const { user, userDetails } = useUser();
  const player = usePlayer();

  useEffect(() => {
    if (userDetails?.avatar_url) {
      setAvatar(userDetails?.avatar_url);
    }
  }, [userDetails?.avatar_url, setAvatar]);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    setAvatar(null);
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out')
    }
  }

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-orange-400 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-gray-900/50 hover:bg-gray-900 flex items-center justify-center transition-all"
          >
            <RxCaretLeft
              size={35}
              className="text-white"
            />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-gray-900/50 hover:bg-gray-900 flex items-center justify-center transition-all"
          >
            <RxCaretRight
              size={35}
              className="text-white"
            />
          </button>
        </div>
        <div className="flex md:hidden gap-x-4 items-center">
          <Button
            onClick={() => router.push('/')}
            className={twMerge(
              "p-1.5 text-white",
              pathname === '/' ? 'bg-gray-900' : 'bg-gray-900/50 hover:bg-gray-900'
            )}
          >
            <AiOutlineHome size={20} />
          </Button>
          <Button
            onClick={() => router.push('/search')}
            className={twMerge(
              "p-1.5 text-white",
              pathname === '/search' ? 'bg-gray-900' : 'bg-gray-900/50 hover:bg-gray-900'
            )}
          >
            <AiOutlineSearch size={20} />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          {
            user ? (
              <div className="flex gap-x-3 items-center">
                <Button
                  onClick={handleLogout}
                  className="py-0 bg-transparent text-gray-900 hover:text-white transition-all"
                >
                  Logout
                </Button>
                <Button
                  onClick={() => {router.push('/account')}}
                  className="p-0 hover:opacity-70 transition-all bg-transparent"
                >
                  <Image
                    width={40}
                    height={40}
                    src={avatar || "/placeholders/user-dark.svg"}
                    alt="account"
                    className="rounded-full object-cover shadow-md"
                  />
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-gray-900 hover:bg-gray-900/50 text-white px-6 py-2 transition-all"
                >
                  Upload or Listen
                </Button>
              </div>
            )
          }
        </div>
      </div>
      { children }
    </div>
  );
}
export default Header;