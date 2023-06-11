'use client';

import Box from "@/components/Box";
import {Audio} from "react-loader-spinner";

const PageLoading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <Audio
        height="80"
        width="80"
        color="#f97316"
        ariaLabel="audio-loading"
        visible={true}
      />
    </Box>
  );
}
export default PageLoading;