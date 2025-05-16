
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SearchPhotos from "./pages/SearchPhotos";
import CartPage from "./pages/CartPage"; // Import the new CartPage

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<CartPage />} /> {/* Updated route */}
          <Route path="/eventos" element={<p className="flex min-h-screen items-center justify-center">Página de Eventos em construção</p>} />
          <Route path="/fotos" element={<SearchPhotos />} />
          <Route path="/historico" element={<p className="flex min-h-screen items-center justify-center">Página de Histórico em construção</p>} />
          <Route path="/fotografo" element={<p className="flex min-h-screen items-center justify-center">Área do Fotógrafo em construção</p>} />
          <Route path="/perfil" element={<p className="flex min-h-screen items-center justify-center">Página de Perfil em construção</p>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
