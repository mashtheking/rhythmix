import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {
  AiFillHeart,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser
} from "react-icons/ai";

const useSidebarRoutes = () => {
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
      icons: [AiOutlineSearch, AiOutlineSearch],
      label: 'Search',
      active: pathname === '/search',
      href: '/search'
    },
    {
      icons: [AiOutlineUser, AiOutlineUser],
      label: 'Account',
      active: pathname === '/account',
      href: '/account'
    },
  ], [pathname]);
}
export default useSidebarRoutes;