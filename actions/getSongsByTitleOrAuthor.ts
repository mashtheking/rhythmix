import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "@/actions/getSongs";

const getSongsByTitleOrAuthor = async (searchString: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  if (!searchString) {
    return await getSongs();
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .or(`title.ilike.%${searchString}%,author.ilike.%${searchString}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongsByTitleOrAuthor;