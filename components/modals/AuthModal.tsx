'use client';

import Modal from "@/components/modals/Modal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa, ViewType} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import {useEffect, useState} from "react";
import Link from "next/link";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose} = useAuthModal();
  const [ view, setView ] = useState<ViewType>('sign_up');

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={view === 'sign_in' ? 'Welcome Back' : 'Create an Account'}
      description={view === 'sign_in' ? 'Sign in to your Rhythmix account and continue listening.' : 'Get unlimited access to all of your favourite songs.'}
    >
      <Auth
        view={view}
        providers={["github", "google"]}
        showLinks={false}
        supabaseClient={supabaseClient}
        socialLayout="horizontal"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#f97316',
                brandAccent: '#ea580c',
                inputText: '#111827',
                dividerBackground: '#d1d5db',
                anchorTextColor: '#6b7280',
                anchorTextHoverColor: '#111827',
                messageText: '#e11d48',
                messageTextDanger: '#e11d48',
                inputBorder: '#d1d5db',
                inputBorderHover: '#6b7280',
                inputBorderFocus: '#6b7280',

              },
              radii: {
                borderRadiusButton: '6px',
                buttonBorderRadius: '6px',
                inputBorderRadius: '6px',
              },
            }
          },
        }}
      />
      <Link
        className="flex justify-center mt-5 w-full font-normal text-sm text-gray-500 hover:underline"
        onClick={() => setView(view === 'sign_in' ? 'sign_up' : 'sign_in')}
        href="#"
      >
        {
          view === 'sign_in' ? 'Dont have an account? Sign up' : 'Already have an account? Sign in'
        }
      </Link>
    </Modal>
  );
}
export default AuthModal;