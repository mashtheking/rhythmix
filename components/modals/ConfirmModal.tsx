import Modal from "@/components/modals/Modal";
import useConfirmModal from "@/hooks/useConfirmModal";
import Button from "@/components/ui/Button";
import {Song} from "@/types";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import useUser from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useState} from "react";
import Spinner from "@/components/loading/Spinner";

const ConfirmModal = () => {
  const { isOpen, onClose, song, setSong } = useConfirmModal();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleDelete = async (song: Song | null) => {
    if(!user || !song) {
      return;
    }

    setIsLoading(true);

    try {
      const { error: dbError } = await supabaseClient
        .from('songs')
        .delete()
        .eq('user_id', user.id)
        .eq('id', song.id);

      if (dbError) {
        return toast.error("Unable to delete song");
      }

      await Promise.allSettled([
        supabaseClient
          .storage
          .from('songs')
          .remove([song.song_path]),
        supabaseClient
          .storage
          .from('images')
          .remove([song.image_path])
      ]);

      toast.success('Song deleted successfully');
    } catch (error: any) {
      toast.error("Unable to delete song");
    } finally {
      setSong(null);
      onClose();
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <Modal
      title="Delete song"
      description={`Are you sure you want to delete the song '${song?.title}' ? This action cannot be undone.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex gap-x-2 justify-end">
        <Button
          disabled={isLoading}
          className="bg-gray-300 rounded-md hover:bg-gray-400/70"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 bg-rose-500 hover:bg-rose-600 rounded-md text-white"
          onClick={() => handleDelete(song)}
        >
          {isLoading && <Spinner />}
          Delete
        </Button>
      </div>
    </Modal>
  );
}
export default ConfirmModal;