import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StepIndicator from './StepIndicator';

export default function GuideLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-glow" />
      <div className="noise-overlay" />

      <Navbar />

      <StepIndicator />

      <main className="flex-grow flex flex-col items-center px-4 md:px-6 pb-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
