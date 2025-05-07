import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiUser, FiMail, FiPhone, FiMessageSquare, FiMapPin } from 'react-icons/fi';
import QR from "../../assets/QR.jpg"

const EnrollPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle success message via URL param (FormSubmit.co redirect)
  useEffect(() => {
    if (window.location.search.includes('success=true')) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Animation variants
  const fadeSlide = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, type: 'spring' }
    })
  };

  // Payment section (static, as per your original)
  const PaymentSection = () => (
    <motion.form
      method="POST"
      action="https://formsubmit.co/aishwaryagupta62601@gmail.com"
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeSlide}
    >
      <input type="hidden" name="_subject" value="New Enrollment Payment" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={window.location.origin + window.location.pathname + '?success=true'} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="paymentMethod" value="UPI" />

      <motion.div variants={fadeSlide} custom={1} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center">
        <h4 className="text-lg font-semibold text-violet-700 dark:text-violet-400 mb-4">Scan QR Code to Pay</h4>
        <div className="bg-white p-2 rounded-lg shadow-md mb-4">
          <img src= {QR}  alt="UPI Payment QR Code" className="w-48 h-48 object-contain" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-2">
          <span className="font-medium">UPI ID:</span> aishwaryagupta62601@okicici
        </p>
        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Safe & Secure
        </div>
      </motion.div>
      <motion.div variants={fadeSlide} custom={2} className="mt-4 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Total Amount:</span>
          <span className="text-xl font-bold text-violet-700 dark:text-violet-400">$199</span>
        </div>
      </motion.div>
      <motion.button
        type="submit"
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-5 rounded-lg shadow-md w-full"
        variants={fadeSlide}
        custom={3}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        Complete Payment
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setShowPayment(false)}
        className="mt-4 text-center w-full text-violet-600 dark:text-violet-400 hover:underline"
        variants={fadeSlide}
        custom={4}
      >
        Back to enrollment form
      </motion.button>
    </motion.form>
  );

  return (
    <motion.div
      className={`min-h-screen transition-all duration-700 ease-out ${darkMode ? 'dark text-white' : 'text-gray-800'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.header
        className="text-white text-center py-4 shadow-md relative overflow-hidden z-10 sticky top-0 backdrop-blur-md bg-violet-900/70 dark:bg-gray-900/80"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 className="text-2xl font-bold">Learner's Point</motion.h1>
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: darkMode ? -15 : 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <FiSun className="text-yellow-300" /> : <FiMoon className="text-indigo-200" />}
          </motion.button>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.section
          className="max-w-4xl mx-auto mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeSlide}
        >
          <motion.h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            Start Your Learning Adventure
          </motion.h2>
          <motion.p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Join Learner's Point and unlock your potential with our expert-led courses and supportive community.
          </motion.p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.section
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            initial="hidden"
            animate="visible"
            variants={fadeSlide}
            custom={1}
          >
            <h3 className="text-2xl font-semibold mb-6 text-violet-700 dark:text-violet-400">Visit Us</h3>
            <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-violet-500/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.9437034498296!2d81.0194626!3d26.7780644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be5a529661bf1%3A0x9de7841609b8b44!2sLearners%20Point%20Coaching%20Centre!5e0!3m2!1sen!2sin!4v1746599103271!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Learners Point Coaching Centre Location"
                className="absolute inset-0"
              ></iframe>
              <motion.div
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <FiMapPin className="text-violet-600 dark:text-violet-400 text-xl" />
              </motion.div>
            </div>
            <motion.div
              className="mt-6 p-4 bg-violet-50 dark:bg-gray-700/50 rounded-lg"
              initial="hidden"
              animate="visible"
              variants={fadeSlide}
              custom={2}
            >
              <h4 className="font-semibold text-violet-700 dark:text-violet-400 mb-2">Discover Our Campus</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Experience our modern learning environment and connect with our passionate educators at Learner's Point, Lucknow.
              </p>
              <div className="mt-4">
                <a
                  href="https://goo.gl/maps/cF5Z2W8X9JZ2QUuw9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-violet-600 dark:text-violet-400 hover:underline"
                >
                  <span>Get Directions</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            initial="hidden"
            animate="visible"
            variants={fadeSlide}
            custom={2}
          >
            <h3 className="text-2xl font-semibold mb-6 text-violet-700 dark:text-violet-400">
              {showPayment ? "Payment Information" : "Enrollment Form"}
            </h3>

            {showSuccess && (
              <motion.div
                className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 p-4 rounded-md mb-4"
                initial="hidden"
                animate="visible"
                variants={fadeSlide}
                custom={3}
              >
                <strong>Thank you for enrolling!</strong> We have received your information and will reach out soon.
              </motion.div>
            )}

            {!showPayment ? (
              <motion.form
                method="POST"
                action="https://formsubmit.co/aishwaryagupta62601@gmail.com"
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={fadeSlide}
              >
                <input type="hidden" name="_subject" value="New Enrollment Submission" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.origin + window.location.pathname + '?success=true'} />
                <input type="hidden" name="_template" value="table" />

                <motion.div variants={fadeSlide} custom={1}>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="fullName">
                    <FiUser className="inline mr-2" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </motion.div>
                <motion.div variants={fadeSlide} custom={2}>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="email">
                    <FiMail className="inline mr-2" /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </motion.div>
                <motion.div variants={fadeSlide} custom={3}>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="phone">
                    <FiPhone className="inline mr-2" /> Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </motion.div>
                <motion.div variants={fadeSlide} custom={4}>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="message">
                    <FiMessageSquare className="inline mr-2" /> Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    placeholder="Tell us about your learning goals or any questions you have"
                  ></textarea>
                </motion.div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-5 rounded-lg shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowPayment(true)}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 px-5 rounded-lg shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(66, 153, 225, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue to Payment
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <PaymentSection />
            )}
          </motion.section>
        </div>
      </main>

      <motion.footer
        className="bg-violet-900/80 dark:bg-gray-900/80 backdrop-blur-md text-white py-8 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Learner's Point. All rights reserved.</p>
          <p className="text-sm text-violet-200 dark:text-gray-400">
            For inquiries, contact us at <a href="mailto:aishwaryagupta62601@gmail.com" className="underline hover:text-white transition-colors">aishwaryagupta62601@gmail.com</a>
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default EnrollPage;
