// src/App.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";

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
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          <Header />
          <main className="flex-1">
            <HomePage />
          </main>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      } />
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
    </Routes>
  );
}
