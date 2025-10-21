import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/Layout/AppLayout";
import { useAuthStore } from "@/store/useAuthStore";

import Login from "./pages/Login";
import RecuperarSenha from "./pages/RecuperarSenha";
import Dashboard from "./pages/Dashboard";
import Cursos from "./pages/Cursos";
import CursoDetalhes from "./pages/CursoDetalhes";
import AulaAtual from "./pages/AulaAtual";
import Questoes from "./pages/Questoes";
import Simulados from "./pages/Simulados";
import Avaliacoes from "./pages/Avaliacoes";
import Certificados from "./pages/Certificados";
import MeusCursos from "./pages/MeusCursos";
import MinhasPerguntas from "./pages/MinhasPerguntas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            
            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/meus-cursos" element={<MeusCursos />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/cursos/:id" element={<CursoDetalhes />} />
              <Route path="/aula/:cursoId/:aulaId" element={<AulaAtual />} />
              <Route path="/questoes" element={<Questoes />} />
              <Route path="/simulados" element={<Simulados />} />
              <Route path="/avaliacoes" element={<Avaliacoes />} />
              <Route path="/minhas-perguntas" element={<MinhasPerguntas />} />
              <Route path="/certificados" element={<Certificados />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
