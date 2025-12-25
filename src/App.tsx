import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import TaxInformationForm from "./pages/dashboard/TaxInformationForm";
import UploadDocuments from "./pages/dashboard/UploadDocuments";
import DraftCopy from "./pages/dashboard/DraftCopy";
import FinalCopy from "./pages/dashboard/FinalCopy";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersManagement from "./pages/admin/AdminUsersManagement";
import AdminUserDetail from "./pages/admin/AdminUserDetail";
import AdminActivities from "./pages/admin/AdminActivities";
import AdminTaxForms from "./pages/admin/AdminTaxForms";

// Service Pages
import TaxReturnFiling from "./pages/services/TaxReturnFiling";
import UnlimitedTaxConsultations from "./pages/services/UnlimitedTaxConsultations";
import RefundStatus from "./pages/RefundStatus";
import StateRefundStatus from "./pages/StateRefundStatus";
import ExtensionFiling from "./pages/services/ExtensionFiling";
import ItinGuidance from "./pages/services/ItinGuidance";
import FicaTaxes from "./pages/services/FicaTaxes";
import TaxPlanning from "./pages/services/TaxPlanning";
import TaxExpertSupport from "./pages/services/TaxExpertSupport";
import TaxReturnsAssessment from "./pages/services/TaxReturnsAssessment";
import AccurateTaxEstimates from "./pages/services/AccurateTaxEstimates";
import FbarFatcaFiling from "./pages/services/FbarFatcaFiling";
import W4Assistance from "./pages/services/W4Assistance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/tax-information-form" element={<TaxInformationForm />} />
            <Route path="/dashboard/upload-documents" element={<UploadDocuments />} />
            <Route path="/dashboard/draft-copy" element={<DraftCopy />} />
            <Route path="/dashboard/final-copy" element={<FinalCopy />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/tax-forms" element={<AdminTaxForms />} />
            <Route path="/admin/users" element={<AdminUsersManagement />} />
            <Route path="/admin/users/:userId" element={<AdminUserDetail />} />
            <Route path="/admin/activities" element={<AdminActivities />} />
            
            {/* Service Routes */}
            <Route path="/services/1040-tax-return-filing" element={<TaxReturnFiling />} />
            <Route path="/services/unlimited-tax-consultations" element={<UnlimitedTaxConsultations />} />
            <Route path="/services/extension-filing" element={<ExtensionFiling />} />
            <Route path="/services/itin-guidance" element={<ItinGuidance />} />
            <Route path="/services/fica-taxes-withdrawals" element={<FicaTaxes />} />
            <Route path="/services/tax-planning" element={<TaxPlanning />} />
            <Route path="/services/tax-expert-support" element={<TaxExpertSupport />} />
            <Route path="/services/filed-tax-returns-assessment" element={<TaxReturnsAssessment />} />
            <Route path="/services/accurate-tax-estimates" element={<AccurateTaxEstimates />} />
            <Route path="/services/fbar-fatca-filing" element={<FbarFatcaFiling />} />
            <Route path="/services/w4-assistance" element={<W4Assistance />} />
            
            {/* Refund Status Routes */}
            <Route path="/refund-status" element={<RefundStatus />} />
            <Route path="/refund-status/state" element={<StateRefundStatus />} />
            
            {/* Contact Route */}
            <Route path="/contact" element={<Contact />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
