// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Partners from "./components/Partners";
import FeaturedCampaign from "./components/FeaturedCampaign";
import HowToStart from "./components/HowToStart";
import DonationGrid from "./components/DonationGrid";
import FAQ from "./components/FAQ";
import BlogList from "./components/BlogList";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Payment from "./components/Payment";

function HomePage() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <Stats />
      <Partners />
      <FeaturedCampaign />
      <section id="how">
        <HowToStart />
      </section>
      <section id="donations">
        <DonationGrid />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <BlogList />
      <section id="newsletter">
        <Newsletter />
      </section>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
