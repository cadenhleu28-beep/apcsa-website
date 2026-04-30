import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import UnitPage from "./pages/UnitPage";
import SubUnitPage from "./pages/SubUnitPage";
import ExamPage from "./pages/ExamPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/unit/:unitId" element={<UnitPage />} />
        <Route path="/unit/:unitId/:subSlug" element={<SubUnitPage />} />
        <Route path="/exam" element={<ExamPage />} />
      </Routes>
    </AuthProvider>
  );
}
