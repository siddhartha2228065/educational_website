import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaWhatsapp, FaYoutube, FaGraduationCap, FaBookOpen, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  // Upcoming events data
  const upcomingEvents = [
    {
      title: "Summer Learning Camp 2025",
      date: "June 15-30, 2025",
      icon: <FaCalendarAlt />
    },
    {
      title: "Parent-Teacher Conference",
      date: "May 20, 2025",
      icon: <FaCalendarAlt />
    }
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-600"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-40 left-10 w-40 h-40 rounded-full bg-blue-500"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute bottom-10 right-1/4 w-52 h-52 rounded-full bg-green-500"
        />
        
        {/* Animated book icons */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 0.05 } : { y: 100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-20 left-1/4"
        >
          <FaBookOpen className="text-9xl text-indigo-800" />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 0.05 } : { y: 100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-10 right-10"
        >
          <FaGraduationCap className="text-8xl text-indigo-800" />
        </motion.div>
      </div>

      {/* Main footer content with gradient background */}
      <div className="bg-gradient-to-b from-white via-[#f7f7f7] to-[#eef1ff] py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4"
        >
          {/* Wave separator */}
          <div className="absolute top-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white fill-current">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>

          {/* Logo and tagline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-indigo-600 text-white p-3 rounded-full mb-4">
                <FaGraduationCap className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-indigo-800">Learners Point</h2>
              <p className="text-indigo-600 font-medium mt-1">Illuminating Minds Since 2010</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {/* About */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
                Our Philosophy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At Learners point, we believe education is a transformative journey. Our coaching programs are designed to nurture critical thinking, creativity, and academic excellence in a supportive environment.
              </p>
              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Courses & Programs */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
                Our Programs
              </h3>
              <ul className="space-y-3 text-gray-600">
                <motion.li whileHover={{ x: 5 }} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Elementary Education (Classes 1-5)
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Middle School Excellence (Classes 6-8)
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    High School Preparation (Classes 9-10)
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    College Readiness (Classes 11-12)
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Competitive Exam Coaching
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-3"
                  >
                    <div className="text-indigo-600 mt-1">
                      {event.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-2">
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    View all events
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-5"
            >
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-600 pb-2 inline-block">
                Stay Connected
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-indigo-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">T-16/17, 1302, Okas residency, Golf City, Sector B Ansal API, Lucknow, Hasanpur Khevali, Uttar Pradesh 226030</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-indigo-600 flex-shrink-0" />
                  <p className="text-gray-600">+91 79913 03202</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-indigo-600 flex-shrink-0" />
                  <p className="text-gray-600">learnerspoint202@gmail.com</p>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-gray-900 font-medium mb-2">Subscribe to our newsletter</h4>
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-1.5 top-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md font-medium transition-colors duration-300"
                  >
                    {isSubmitted ? "Sent!" : "Subscribe"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Social Media and Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
              <motion.a 
                whileHover={{ y: -2, color: "#4f46e5" }}
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Home
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "#4f46e5" }}
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                About Us
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "#4f46e5" }}
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Courses
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "#4f46e5" }}
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Testimonials
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "#4f46e5" }}
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Faculty
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "#4f46e5" }}
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Contact
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "#4f46e5" }}
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Privacy Policy
              </motion.a>
            </div>

            {/* Social Media */}
            <div className="flex justify-center md:justify-end space-x-6">
              <motion.a
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="https://chat.whatsapp.com"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaWhatsapp className="text-2xl text-green-500" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaInstagram className="text-2xl text-pink-600" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="https://"
                aria-label="Website"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <TbWorldWww className="text-2xl text-indigo-600" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaYoutube className="text-2xl text-red-600" />
              </motion.a>
            </div>
          </motion.div>

          {/* Copyright and Back to Top */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
          >
            <div>
              &copy; {new Date().getFullYear()} Learners Point. All rights reserved.
            </div>
            <motion.button
              whileHover={{ y: -3 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 md:mt-0 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Back to top
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
