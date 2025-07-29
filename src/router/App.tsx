import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import Login from "../pages/login";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<ProtectedRoute><IndexPage /></ProtectedRoute>} path="/" />
    </Routes>
  );
}

export default App;
