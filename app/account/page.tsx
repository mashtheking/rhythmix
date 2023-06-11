import Header from "@/components/containers/Header";
import AccountContent from "@/app/account/components/AccountContent";
import Avatar from "@/components/Avatar";
import AccountHeaderText from "@/components/AccountHeaderText";
import getSongsByUserId from "@/actions/getSongsByUserId";

const Account = async () => {
  const userSongs = await getSongsByUserId();

  return (
    <div className="bg-gray-200 md:rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <Avatar />
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <AccountHeaderText />
              <h1 className="text-gray-900 text-4xl sm:text-5xl lg:text-7xl font-bold">
                Your Account
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <AccountContent songs={userSongs} />
    </div>
  );
}
export default Account;