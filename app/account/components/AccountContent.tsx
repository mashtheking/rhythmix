'use client';

import useUser from "@/hooks/useUser";
import {useEffect, useState} from "react";
import {postData} from "@/libs/helpers";
import {toast} from "react-hot-toast";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import Button from "@/components/ui/Button";
import useAuthModal from "@/hooks/useAuthModal";
import {BsArrowRightCircleFill, BsTrash} from "react-icons/bs";
import Spinner from "@/components/loading/Spinner";
import {FaCrown} from "react-icons/fa";
import {Song} from "@/types";
import MediaItem from "@/components/containers/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useConfirmModal from "@/hooks/useConfirmModal";

interface AccountContentProps {
  songs: Song[];
}

const AccountContent = ({ songs }: AccountContentProps) => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const confirmModal = useConfirmModal();
  const { user, subscription, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      authModal.onOpen();
    }
  }, [isLoading, user]);

  if (!isLoading && !user) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-gray-500">
        Login to view your subscription details and uploaded songs.
      </div>
    );
  }

  const redirectToCustomerPortal = async () => {
    try {
      setLoading(true);
      const { url } = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        return toast.error((error as Error)?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-7 px-6 flex justify-center md:justify-start">
      {
        !subscription && (
          <div className="flex flex-col gap-y-4">
            <p>
              You are currently on the
              <span className="font-black"> Rhythmix Free </span>
              plan.
            </p>
            <Button
              onClick={subscribeModal.onOpen}
              className="w-80 rounded-md text-white group hover:bg-orange-600"
            >
              <div className="flex justify-center items-center gap-x-2">
                { (isLoading || loading) && <Spinner /> }
                <p className="flex gap-x-0.5">
                  Subscribe to Rhythmix Pro
                  <FaCrown size={10}/>
                </p>
                <p className="group-hover:translate-x-2 transition-all"><BsArrowRightCircleFill size={20}/></p>
              </div>
            </Button>
          </div>
        )
      }
      {
        subscription && (
          <div className="flex flex-col gap-y-4">
            <p className="flex gap-x-1 items-center">
              You are currently on the
              <span className="font-black flex gap-x-0.5"> {subscription?.prices?.products?.name} <FaCrown size={10}/></span>
              plan.
            </p>
            <Button
              disabled={loading || isLoading}
              onClick={redirectToCustomerPortal}
              className="w-80 rounded-md text-white group hover:bg-orange-600"
            >
              <div className="flex justify-center items-center gap-x-2">
                { (isLoading || loading) && <Spinner /> }
                <p>Open customer portal</p>
                <p className="group-hover:translate-x-2 transition-all"><BsArrowRightCircleFill size={20}/></p>
              </div>
            </Button>
          </div>
        )
      }
    </div>
      {
        songs.length === 0 ? (
          <div className="flex flex-col gap-y-2 w-full px-6 text-gray-500">
            No songs uploaded.
          </div>
        ) : (
          <div className="mt-2">
            <h1 className="text-gray-900 text-2xl font-semibold px-6">
              Your uploads
            </h1>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full px-6 justify-center">
              {
                songs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex-1 truncate">
                      <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        song={song}
                      />
                    </div>
                      <button
                        className="text-gray-500 hover:text-rose-500 hover:scale-110 transition-all pr-3"
                        onClick={() => {
                          confirmModal.setSong(song);
                          confirmModal.onOpen();
                        }}
                      >
                        <BsTrash size={20} />
                      </button>
                  </div>
                ))
              }
            </div>
          </div>

        )
      }
    </div>
  );
}
export default AccountContent;