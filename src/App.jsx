import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import all your components
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";
import Contact from "./components/contact/Contact";
import Swipe from "./components/Swipe/Swipe";
import Card from "./components/Card/Card";
import EnrollPage from "./components/Enroll/Enroll";
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';

// HomePage component that combines all the sections
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a loading time
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    <Navbar />
      <Hero />
      <Services />
      <Card />
      <Swipe />
      <Contact />
      <Footer />
    </>
  );
};

// Standalone Contact page component
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </>
  );
};

// Standalone Enroll page component
const EnrollmentPage = () => {
  return (
    <>
      <Navbar />
      <EnrollPage />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <main className="overflow-x-hidden bg-white text-dark">
        <Routes>
          {/* Route for the homepage with all components */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route for the enrollment page */}
          <Route path="/enroll" element={<EnrollmentPage />} />
          
          {/* Route for the contact page - Match the capitalization in Hero.jsx */}
          <Route path="/Contact" element={<ContactPage />} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );

  
  
};

export default App;
