import getSongsByTitleOrAuthor from "@/actions/getSongsByTitleOrAuthor";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";

interface SearchProps {
  searchParams: {
    searchString: string;
  }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitleOrAuthor(searchParams.searchString);

  return (
    <div className="bg-gray-200 md:rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-gray-200">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-gray-900 text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
}
export default Search;
