import { useCallback } from "react";

import { useUploadStore } from "@/store/upload.store";

export const useUpload = () => {
  const uploadError = useUploadStore((state) => state.uploadError);
  const uploadFile = useUploadStore((state) => state.uploadFile);
  const uploadSuccess = useUploadStore((state) => state.uploadSuccess);
  const isLoading = useUploadStore((state) => state.isLoading);
  const clearUploadSuccess = useUploadStore((state) => state.clearUploadSuccess);

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
    uploadSuccess,
    isLoading,
    clearUploadSuccess
  };
};
