import Header from "@/components/containers/Header";
import ListItem from "@/components/containers/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "@/app/(site)/components/PageContent";
import Greeting from "@/components/Greeting";

export const revalidate = 0; //Data in this page will never be cached

const Home = async () => {
  const songs = await getSongs();

  return (
    <div className="bg-gray-200 md:rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <Greeting />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-900 text-2xl font-semibold">
            Latest songs
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
export default Home;
