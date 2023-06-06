import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {AiFillHeart, AiFillHome, AiOutlineHeart, AiOutlineHome} from "react-icons/ai";
import {BsSearch, BsSearchHeart} from "react-icons/bs";

const useRoutes = () => {
  const pathname = usePathname();

  return useMemo(() => [
    {
      icons: [AiOutlineHome, AiFillHome],
      label: 'Home',
      active: pathname === '/',
      href: '/',
    },
    {
      icons: [AiOutlineHeart, AiFillHeart],
      label: 'Liked',
      active: pathname === '/liked',
      href: '/liked',
    },
    {
      icons: [BsSearch, BsSearchHeart],
      label: 'Search',
      active: pathname === '/search',
      href: '/search'
    }
  ], [pathname]);
}
export default useRoutes;