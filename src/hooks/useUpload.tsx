import { useCallback } from "react";

import { useUploadStore } from "@/store/upload.store";

export const useUpload = () => {
  const uploadError = useUploadStore((state) => state.uploadError);
  const uploadFile = useUploadStore((state) => state.uploadFile);

  const handleUpload = useCallback(
    async (file: File) => {
      await uploadFile(file);
    },
    [uploadFile]
  );

  return {
    uploadError,
    uploadFile: handleUpload,
    handleUpload,
  };
};
