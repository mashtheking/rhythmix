import './globals.css'
import { Roboto } from 'next/font/google'
import Sidebar from "@/components/sidebar/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { ReactNode } from "react";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/player/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"]
})

export const metadata = {
  title: 'Rhythmix',
  description: 'Sync your soul. Rhythms take control!',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rhythmix.vercel.app',
    title: "Rhythmix",
    siteName: 'Rhythmix',
    description: "Sync your soul. Rhythms take control!",
    images: [
      {
        url: 'images/logo.svg',
        width: 256,
        height: 256,
      }
    ],
  },
  twitter: {
    title: "Rhythmix",
    description: "Sync your soul. Rhythms take control!",
    card: "summary_large_image",
    images: [
      {
        url: 'images/logo.png',
        width: 256,
        height: 256,
      }
    ],
  }
}

export const revalidate = 0;

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>
              { children }
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
export default RootLayout;