'use client';

import Modal from "@/components/modals/Modal";
import useAvatarModal from "@/hooks/useAvatarModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/loading/Spinner";
import Compressor from 'compressorjs';
import uniqid from "uniqid";

const AvatarModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onClose, setAvatar } = useAvatarModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      image: null,
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];

      if (!imageFile || !user) {
        return toast.error("No image selected");
      }

      //Compress image before uploading
      new Compressor(imageFile, {
        maxWidth: 1024,
        maxHeight: 1024,

        async success(file: File | Blob) {
          const uniqueID = uniqid();

          //Upload image
          const {
            data: imageData,
            error: imageError,
          } = await supabaseClient
            .storage
            .from('avatars')
            .upload(`avatar-${uniqueID}`, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (imageError) {
            return toast.error(imageError.message);
          }

          const { data: image } = supabaseClient
            .storage
            .from('avatars')
            .getPublicUrl(imageData.path);

          const { error: supabaseError } = await supabaseClient
            .from('users')
            .update({ avatar_url: image.publicUrl })
            .eq('id', user.id);

          if (supabaseError) {
            return toast.error(supabaseError.message)
          }

          setAvatar(image.publicUrl);
          router.refresh();
          toast.success('Profile picture updated');
          reset();
          onClose();
        },
        error() {
          toast.error("Something went wrong");
        }
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Update profile picture"
      description="Upload a jpeg or png file"
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="rounded-md text-white flex flex-row space-x-2 justify-center hover:bg-orange-600"
        >
          {isLoading && <Spinner />}
          {isLoading ? 'Uploading' : 'Done'}
        </Button>
      </form>
    </Modal>
  );
}
export default AvatarModal;