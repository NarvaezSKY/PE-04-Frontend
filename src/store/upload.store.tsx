import { create } from "zustand";

import { uploadsRepository } from "@/core/uploads/infrastructure/uploads.repository";
import { uploadExcelUseCase } from "@/core/uploads/application/upload.use-case";

type State = {
  uploadError: string | null;
  uploadSuccess: string | null;
  isLoading: boolean;
};

type Actions = {
  uploadFile: (file: File) => Promise<void>;
  clearUploadSuccess: () => void;
};

type Store = State & Actions;

export const useUploadStore = create<Store>((set) => ({
  uploadError: null,
  uploadSuccess: null,
  isLoading: false,
  uploadFile: async (file: File) => {
    try {
      set({ isLoading: true, uploadError: null, uploadSuccess: null });
      await uploadExcelUseCase(uploadsRepository)(file);
      set({ uploadError: null, uploadSuccess: "Archivo subido exitosamente, verifica la siguiente hora de actualización", isLoading: false });
    } catch (error) {
      console.error("Error uploading file:", error);
      set({ uploadError: "Algo salió mal, inténtalo de nuevo en un rato. Si el error persiste, contacta al administrador.", isLoading: false, uploadSuccess: null });
    }
  }, 
  
  clearUploadSuccess: () => set({ uploadSuccess: null }),
}));
