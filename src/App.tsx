// src/App.tsx
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import { useAuth } from "./context/AuthContext";

// Lazy load components that are below the fold
const Partners = lazy(() => import("./components/Partners"));
const FeaturedCampaign = lazy(() => import("./components/FeaturedCampaign"));
const HowToStart = lazy(() => import("./components/HowToStart"));
const DonationGrid = lazy(() => import("./components/DonationGrid"));
const FAQ = lazy(() => import("./components/FAQ"));
const BlogList = lazy(() => import("./components/BlogList"));
const Newsletter = lazy(() => import("./components/Newsletter"));
const Footer = lazy(() => import("./components/Footer"));
const PaymentPage = lazy(() => import("./components/PaymentPage"));
const HospitalNeedFormPage = lazy(() => import("./components/HospitalNeedFormPage"));

const RequestReviewPage = lazy(() => import("./components/RequestReviewPage"));
const AuthLandingPage = lazy(() => import("./components/AuthLandingPage"));
const HospitalDashboard = lazy(() => import("./components/HospitalDashboard"));
const MinistryDashboard = lazy(() => import("./components/MinistryDashboard"));

// Loading fallback component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <Stats />
      <Suspense fallback={<LoadingSpinner />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedCampaign />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <section id="how">
          <HowToStart />
        </section>
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <section id="donations">
          <DonationGrid />
        </section>
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <section id="faq">
          <FAQ />
        </section>
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <BlogList />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <section id="newsletter">
          <Newsletter />
        </section>
      </Suspense>
    </>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth Landing Page - Entry Point for All Users */}
      <Route path="/auth" element={
        <Suspense fallback={<LoadingSpinner />}>
          <AuthLandingPage />
        </Suspense>
      } />
      
      {/* Public Homepage - Shows Approved Requests Only */}
      <Route path="/" element={
        user ? (
          <div className="min-h-screen flex flex-col bg-white text-gray-900">
            <Header />
            <main className="flex-1">
              <HomePage />
            </main>
            <Suspense fallback={<LoadingSpinner />}>
              <Footer />
            </Suspense>
          </div>
        ) : (
          <Navigate to="/auth" replace />
        )
      } />
      
      {/* Hospital Dashboard */}
      <Route path="/dashboard/hospital" element={
        <Suspense fallback={<LoadingSpinner />}>
          <HospitalDashboard />
        </Suspense>
      } />
      
      {/* Health Ministry Dashboard */}
      <Route path="/dashboard/ministry" element={
        <Suspense fallback={<LoadingSpinner />}>
          <MinistryDashboard />
        </Suspense>
      } />
      
      {/* Payment Page */}
      <Route path="/payment/:equipmentId" element={
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <PaymentPage />
            </Suspense>
          </main>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      } />
      
      {/* Submit Hospital Need Request */}
      <Route path="/submit-need" element={
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <HospitalNeedFormPage />
            </Suspense>
          </main>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      } />
      
      {/* Admin Dashboard (Legacy - Redirects to Ministry Dashboard) */}
      <Route path="/admin/dashboard" element={
        <Navigate to="/dashboard/ministry" replace />
      } />
      
      {/* Request Review Page */}
      <Route path="/admin/requests/:requestId" element={
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <RequestReviewPage />
            </Suspense>
          </main>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      } />
    </Routes>
  );
}
