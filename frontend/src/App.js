import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsoleSelector from './components/ConsoleSelector';
import Footer from './components/Footer';
import GuideLayout from './components/GuideLayout';
import StepInfo from './components/steps/StepInfo';
import StepTools from './components/steps/StepTools';
import StepPreparation from './components/steps/StepPreparation';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-glow" />
      <div className="noise-overlay" />
      <Navbar />
      <main className="flex-grow flex flex-col items-center">
        <Hero />
        <ConsoleSelector />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guide/wiiu" element={<GuideLayout />}>
          <Route index element={<Navigate to="info" replace />} />
          <Route path="info" element={<StepInfo />} />
          <Route path="outils" element={<StepTools />} />
          <Route path="preparation" element={<StepPreparation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
