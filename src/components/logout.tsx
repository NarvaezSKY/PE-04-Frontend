import { Button } from "@heroui/react";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

export function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Button color="danger" variant="light" size="sm" onClick={handleLogout} isIconOnly>
      <IoLogOut className="text-2xl text-danger" />
    </Button>
  );
}