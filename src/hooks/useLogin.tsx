import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { ILoginReq } from "@/core/auth/domain/login";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { login, authError, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: ILoginReq) => {
    setIsLoading(true);
    try {
      await login(data);
      const currentUser = useAuthStore.getState().user;

      if (currentUser) {
        toast.success("Inicio de sesión exitoso");
        navigate("/", { replace: true });
      } else {
        toast.error("Por favor, verifica tus credenciales.");
      }
    } catch (e) {
      toast.error("Unexpected error");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    authError,
    user,
  };
};
