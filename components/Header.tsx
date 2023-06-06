'use client';

import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {AiFillHome} from "react-icons/ai";
import {BsSearchHeart} from "react-icons/bs";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import useUser from "@/hooks/useUser";
import {FaUserAlt} from "react-icons/fa";
import { toast } from "react-hot-toast";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO: Reset any playing songs
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
        "h-fit bg-gradient-to-b from-orange-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black/50 flex items-center justify-center hover:bg-black/75 transition-all"
          >
            <RxCaretLeft
              size={35}
              className="text-white"
            />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black/50 flex items-center justify-center hover:bg-black/75 transition-all"
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
            className="p-2 bg-white"
          >
            <AiFillHome className="text-black" size={20} />
          </Button>
          <Button
            onClick={() => router.push('/search')}
            className="p-2 bg-white"
          >
            <BsSearchHeart className="text-black" size={20} />
          </Button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {
            user ? (
              <div className="flex gap-x-4 items-center">
                <Button
                  onClick={handleLogout}
                  className="bg-white px-6 py-2"
                >
                  Logout
                </Button>
                <Button
                  onClick={() => {router.push('/account')}}
                  className="bg-white"
                >
                  <FaUserAlt />
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Button
                    onClick={onOpen}
                    className="py-0 bg-transparent text-white font-medium transition-all"
                  >
                    Sign up
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={onOpen}
                    className="bg-white px-6 py-2 transition-all"
                  >
                    Login
                  </Button>
                </div>
              </>
            )
          }

        </div>
      </div>
      { children }
    </div>
  );
}
export default Header;