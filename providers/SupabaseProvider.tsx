'use client';

import {ReactNode, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/index_db";
import {SessionContextProvider} from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
  children: ReactNode;
}

const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      { children }
    </SessionContextProvider>
  );
}
export default SupabaseProvider;