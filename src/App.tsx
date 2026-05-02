import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import UnitPage from "./pages/UnitPage";
import SubUnitPage from "./pages/SubUnitPage";
import ExamPage from "./pages/ExamPage";
import AuthPage from "./pages/AuthPage";
import MCQBankPage from "./pages/MCQBankPage";
import GuidePage from "./pages/GuidePage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/unit/:unitId" element={<UnitPage />} />
        <Route path="/unit/:unitId/:subSlug" element={<SubUnitPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/exam/:examId" element={<ExamPage />} />
        <Route path="/mcq-bank" element={<MCQBankPage />} />
      </Routes>
      <Analytics />
    </AuthProvider>
  );
}
