import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import KnowledgeVault from "@/pages/KnowledgeVault";
import Roadmap from "@/pages/Roadmap";
import Testpad from "@/pages/Testpad";
import Community from "@/pages/Community";
import LeaveManager from "@/pages/LeaveManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <Routes>
            <Route path="/" element={<KnowledgeVault />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/testpad" element={<Testpad />} />
            <Route path="/community" element={<Community />} />
            <Route path="/leave" element={<LeaveManager />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
