'use client';

import useUser from "@/hooks/useUser";
import {useEffect, useState} from "react";
import {postData} from "@/libs/helpers";
import {toast} from "react-hot-toast";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import {BsArrowRightCircleFill} from "react-icons/bs";
import Spinner from "@/components/loading/Spinner";
import {FaCrown} from "react-icons/fa";

const AccountContent = () => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const { user, subscription, isLoading } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      authModal.onOpen();
    }
  }, [isLoading, user]);

  if (!isLoading && !user) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-gray-500">
        Login to view your subscription details.
      </div>
    );
  }

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
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
  );
}
export default AccountContent;