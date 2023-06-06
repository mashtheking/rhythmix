'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: '',
        style: {
          backgroundColor: "rgba(17, 24, 39, 0.5)",
          boxShadow: "none",
          color: "white",
        },
      }}
    />
  );
}

export default ToasterProvider;