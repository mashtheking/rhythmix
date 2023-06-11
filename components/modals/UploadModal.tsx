'use client';

import Modal from "@/components/modals/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {toast} from "react-hot-toast";
import useUser from "@/hooks/useUser";
import uniqid from "uniqid";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import Spinner from "@/components/loading/Spinner";
import Compressor from 'compressorjs';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onClose } = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!imageFile || !songFile || !user) {
        return toast.error("Missing fields");
      }

      const uniqueID = uniqid();

      //Upload song
      const {
        data: songData,
        error: songError,
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });

      if(songError) {
        return toast.error(songError.message);
      }

      //Compress image before uploading
      new Compressor(imageFile, {
        maxWidth: 512,
        maxHeight: 512,

        async success(file: File | Blob) {
          //Upload image
          const {
            data: imageData,
            error: imageError,
          } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, file, {
              cacheControl: '3600',
              upsert: false
            });

          if(imageError) {
            return toast.error(imageError.message);
          }

          const { error: supabaseError } = await supabaseClient
            .from('songs')
            .insert({
              user_id: user.id,
              title: values.title,
              author: values.author,
              image_path: imageData.path,
              song_path: songData?.path
            })

          if(supabaseError) {
            return toast.error(supabaseError.message)
          }

          router.refresh();
          toast.success('Song created');
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
      title="Add a song"
      description="Upload an mp3 file"
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
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
          className="bg-gray-200"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
          className="bg-gray-200"
        />
        <div>
          <div className="pb-1">
            Select a song file
          </div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
            className="bg-gray-200"
          />
        </div>
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
            className="bg-gray-200"
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="rounded-md text-white flex flex-row space-x-2 justify-center hover:bg-orange-600"
        >
          {isLoading && <Spinner />}
          {isLoading ? 'Uploading' : 'Create'}
        </Button>
      </form>
    </Modal>
  );
}
export default UploadModal;