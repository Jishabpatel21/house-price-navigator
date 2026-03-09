
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PredictPage from "./pages/PredictPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminPage from "./pages/AdminPage";
import MethodologyPage from "./pages/MethodologyPage";
import DatasetInfoPage from "./pages/DatasetInfoPage";
import ApiDocsPage from "./pages/ApiDocsPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import FaqPage from "./pages/FaqPage";
import SupportPage from "./pages/SupportPage";
import AccountPage from "./pages/AccountPage";
import PredictionsPage from "./pages/PredictionsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiePage from "./pages/CookiePage";
import AdvancedAnalyticsPage from "./pages/AdvancedAnalyticsPage";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/advanced-analytics" element={<AdvancedAnalyticsPage />} />
          <Route path="/payment/:plan" element={<PaymentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/dataset" element={<DatasetInfoPage />} />
          <Route path="/api-docs" element={<ApiDocsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogArticlePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
