'use client';

import {ReactNode} from "react";
import {MyUserContext} from "@/context/MyUserContext";

interface UserProvider {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProvider) => {
  return (
    <MyUserContext>
      { children }
    </MyUserContext>
  )
};
export default UserProvider;