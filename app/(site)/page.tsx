import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "@/app/(site)/components/PageContent";

export const revalidate = 0; //Data in this page will never be cached

const Home = async () => {
  const getGreeting = () => {
    const hr = new Date().getHours();
    return `Good ${(hr < 12) ? 'Morning' : (hr < 18) ? 'Afternoon' : 'Evening'}`;
  }

  const songs = await getSongs();

  return (
    <div className="bg-gray-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            { getGreeting() }
          </h1>
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
          <h1 className="text-white text-2xl font-semibold">
            Latest songs
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
export default Home;
