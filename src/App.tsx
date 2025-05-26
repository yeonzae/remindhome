
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HospitalMap from "./pages/HospitalMap";
import HospitalDetail from "./pages/HospitalDetail";
import CostCalculator from "./pages/CostCalculator";
import CareGuide from "./pages/CareGuide";
import QnA from "./pages/QnA";
import Community from "./pages/Community";
import DementiaAssessment from "./pages/DementiaAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hospital-map" element={<HospitalMap />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/cost-calculator" element={<CostCalculator />} />
        <Route path="/care-guide" element={<CareGuide />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dementia-assessment" element={<DementiaAssessment />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
