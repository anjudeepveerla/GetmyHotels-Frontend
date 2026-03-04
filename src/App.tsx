import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/hotel/Navbar";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Wellness from "./pages/Wellness";
import Travel from "./pages/Travel";
import Creativity from "./pages/Creativity";
import Growth from "./pages/Growth";
import Authors from "./pages/Authors";
import StyleGuide from "./pages/StyleGuide";
import Support from "./pages/Support";
import SignIn from "./pages/SignIn";
import AISearch from "./pages/AISearch";
import SearchResults from "./pages/SearchResults";
import HotelDetail from "./pages/HotelDetail";
import BookingDetails from "./pages/BookingDetails";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Careers from "./pages/Careers";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import MyAccount from "./pages/MyAccount";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppErrorBoundary>
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/creativity" element={<Creativity />} />
              <Route path="/growth" element={<Growth />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/style-guide" element={<StyleGuide />} />
              <Route path="/support" element={<Support />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/ai-search" element={<AISearch />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/hotel/:hotelId" element={<HotelDetail />} />
              <Route path="/booking-details" element={<BookingDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppErrorBoundary>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
