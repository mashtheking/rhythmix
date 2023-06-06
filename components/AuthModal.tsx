'use client';

import Modal from "@/components/Modal";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import {useEffect} from "react";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();

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
      title="Welcome back"
      description="Login to your account"
    >
      <Auth
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#f97316',
                brandAccent: '#6b7280',
                inputText: '#f3f4f6',
                dividerBackground: '#6b7280',
                anchorTextColor: '#6b7280',
                anchorTextHoverColor: '#f3f4f6',
                messageTextDanger: '#e11d48',
                inputBorder: '#6b7280',
                inputBorderHover: '#f3f4f6',
                inputBorderFocus: '#f3f4f6',

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
    </Modal>
  );
}
export default AuthModal;