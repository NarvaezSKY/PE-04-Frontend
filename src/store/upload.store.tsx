import { create } from "zustand";

import { uploadsRepository } from "@/core/uploads/infrastructure/uploads.repository";
import { uploadExcelUseCase } from "@/core/uploads/application/upload.use-case";

type State = {
  uploadError: string | null;
};

type Actions = {
  uploadFile: (file: File) => Promise<void>;
};

type Store = State & Actions;

export const useUploadStore = create<Store>((set) => ({
  uploadError: null,
  uploadFile: async (file: File) => {
    try {
      await uploadExcelUseCase(uploadsRepository)(file);
      set({ uploadError: null });
    } catch (error) {
      console.error("Error uploading file:", error);
      set({ uploadError: "File upload failed" });
    }
  },
}));
