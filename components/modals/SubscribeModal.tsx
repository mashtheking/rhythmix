'use client';

import Modal from "@/components/modals/Modal";
import {Price, ProductWithPrice} from "@/types";
import Button from "@/components/ui/Button";
import {useState} from "react";
import useUser from "@/hooks/useUser";
import {toast} from "react-hot-toast";
import {getStripe} from "@/libs/stripeClient";
import {postData} from "@/libs/helpers";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);
}

const SubscribeModal = ({ products }: SubscribeModalProps) => {
  const { isOpen, onClose } = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('Must be logged in');
    }

    if (subscription) {
      setPriceIdLoading(undefined)
      return toast('Already subscribed');
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = (
    <div className="text-center">
      No products available.
    </div>
  )

  if (products.length) {
    content = (
      <div>
        {
          products.map((product) => {
            if (!product.prices?.length) {
              return (
                <div key={product.id}>
                  No prices available.
                </div>
              )
            }

            return product.prices.map((price) => (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="rounded-md text-white"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            ))
          })
        }
      </div>
    )
  }

  if (subscription) {
    content = (
      <div className="text-center">
        Already subscribed.
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Only for Pro user"
      description="Upload your own music with Rhythmix Pro"
    >
      { content }
    </Modal>
  );
};
export default SubscribeModal;