'use client';

import useUser from "@/hooks/useUser";
import Image from "next/image";

const AccountHeaderText = () => {
  const { user, subscription } = useUser();

  return (
    <p className="flex gap-x-1 font-medium text-sm text-gray-700 justify-center md:justify-start">
      {
        user?.email ? user.email : "Rhythmix"
      }
      {
        subscription && (
          <Image
            width={18}
            height={18}
            src="/images/verified.svg"
            alt="verified"
          />
        )
      }
    </p>
  );
}
export default AccountHeaderText;