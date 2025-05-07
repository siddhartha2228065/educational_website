import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaGraduationCap, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import HeroPng from "../../assets/brn.png";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Typewriter component with improved performance
const Typewriter = ({ phrases, typingSpeed = 100, deletingSpeed = 50, pause = 1200, className = "" }) => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isDeleting && charIndex < phrases[phraseIndex].length) {
      timeoutRef.current = setTimeout(() => {
        setText(phrases[phraseIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setText(phrases[phraseIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deletingSpeed);
    } else if (!isDeleting && charIndex === phrases[phraseIndex].length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }, 400);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Enhanced animation variants
const FadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  },
});

const SlideIn = (delay, direction = "left") => ({
  initial: {
    opacity: 0,
    x: direction === "left" ? -60 : 60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smooth animation
    },
  },
});

const ZoomIn = (delay) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut"
    },
  },
});

// Button hover animations
const buttonHoverScale = {
  scale: 1.03,
  transition: { duration: 0.2 }
};

// Reusable AnimatedButton component with enhanced hover effects
const AnimatedButton = ({ to, primary, children, onClick }) => {
  return (
    <motion.div 
      whileHover={buttonHoverScale} 
      whileTap={{ scale: 0.98 }}
      className="relative group"
    >
      {primary && (
        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"
          animate={{
            background: [
              "linear-gradient(90deg, #2563eb, #4f46e5, #7c3aed)",
              "linear-gradient(90deg, #7c3aed, #2563eb, #4f46e5)",
              "linear-gradient(90deg, #4f46e5, #7c3aed, #2563eb)"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      )}
      <Link
        to={to}
        onClick={onClick}
        className={`relative px-6 py-3 ${
          primary 
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
            : "bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50"
        } font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg`}
      >
        <span className="relative z-10">{children}</span>
        {primary && (
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <IoIosArrowRoundForward className="text-xl" />
          </motion.div>
        )}
        {!primary && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg z-0 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

// Animated background shapes component with enhanced visuals
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-80"></div>

      {/* Animated shapes */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-indigo-200 opacity-20 blur-lg"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-40 left-1/4 w-52 h-52 rounded-full bg-purple-200 opacity-20 blur-xl"
        animate={{
          x: [0, 15, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Geometric shape */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-32 h-32 rotate-45 bg-yellow-200 opacity-20 blur-md"
        animate={{
          rotate: [45, 60, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Additional decorative elements */}
      <svg className="absolute bottom-0 right-0 w-32 h-32 text-blue-100 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M45.3,-51.2C58.3,-40.9,68.7,-25.9,71.8,-9.2C75,7.5,70.8,25.9,60.2,39.3C49.5,52.7,32.4,61.1,13.7,66.3C-5,71.5,-25.3,73.6,-39.8,65.5C-54.3,57.3,-63,39,-68.3,19.3C-73.6,-0.4,-75.4,-21.6,-67.4,-37.8C-59.3,-54,-41.3,-65.3,-23.8,-73.2C-6.3,-81.1,10.7,-85.6,24.9,-79.2C39.1,-72.8,50.4,-55.4,45.3,-51.2Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
};

// New component: Floating Stats
const FloatingStats = () => {
  return (
    <motion.div 
      className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md py-3 px-6 rounded-xl shadow-lg border border-blue-100 hidden md:flex gap-8"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.7 }}
    >
      <div className="flex items-center gap-2">
        <FaUserGraduate className="text-blue-600 text-xl" />
        <div>
          <div className="text-blue-900 font-bold text-lg">2,500+</div>
          <div className="text-xs text-gray-600">Students</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FaChalkboardTeacher className="text-indigo-600 text-xl" />
        <div>
          <div className="text-blue-900 font-bold text-lg">Experinced</div>
          <div className="text-xs text-gray-600">Expert Tutors</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-purple-600 text-xl" />
        <div>
          <div className="text-blue-900 font-bold text-lg">98%</div>
          <div className="text-xs text-gray-600">Success Rate</div>
        </div>
      </div>
    </motion.div>
  );
};

// New component: ScrollIndicator
const ScrollIndicator = () => {
  return (
    <motion.div 
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <span className="text-xs text-blue-600 font-medium mb-2">Scroll to explore</span>
      <motion.div 
        className="w-6 h-10 border-2 border-blue-600 rounded-full flex justify-center p-1"
        initial={{ y: 0 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-blue-600 rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const phrases = [
  "Welcome to Learner Point",
  "Empower your study experience",
  "Experience Expert Tutors",
  "Welcoming and Friendly Environment"
];

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  return (
    <section className="overflow-hidden relative w-full min-h-screen">
      {/* Background animations */}
      <AnimatedBackground />

      {/* Main content */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 min-h-[650px] gap-8 pt-16 relative z-10"
        style={{ opacity }}
      >
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-10 md:py-0 relative z-20 order-2 md:order-1">
          <div className="text-center md:text-left space-y-6 lg:space-y-8 lg:max-w-[480px]">
            <motion.span
              variants={SlideIn(0.1, "left")}
              initial="initial"
              animate="animate"
              className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-2"
            >
              Transforming Education
            </motion.span>

            <motion.h1
              variants={FadeUp(0.2)}
              initial="initial"
              animate="animate"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-4xl lg:text-5xl font-medium tracking-tight text-transparent">
                Unlock Your Potential With Expert Coaching
              </span>
            </motion.h1>

            {/* Typewriter effect below headline */}
            <motion.div
              variants={FadeUp(0.3)}
              initial="initial"
              animate="animate"
            >
              <Typewriter
                phrases={phrases}
                typingSpeed={80}
                deletingSpeed={40}
                pause={1200}
                className="block text-blue-600 text-xl sm:text-2xl font-mono font-semibold min-h-[2.5rem] mb-2"
              />
            </motion.div>

            <motion.p
              variants={FadeUp(0.4)}
              initial="initial"
              animate="animate"
              className="text-gray-700 text-base sm:text-lg"
            >
              Achieve academic excellence with our personalized coaching, expert tutors, and a friendly learning environment that adapts to your unique learning style.
            </motion.p>

            {/* Enhanced Buttons with animations */}
            {/* <motion.div
              variants={FadeUp(0.5)}
              initial="initial"
              animate="animate"
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8"
            >
              <AnimatedButton to="/enroll" primary>
                Enroll Now
              </AnimatedButton>
              
              <AnimatedButton onClick={() => setShowModal(true)}>
                Watch Video
              </AnimatedButton>
            </motion.div> */}
          </div>
        </div>

        {/* Hero Image with enhanced presentation */}
        <div className="flex justify-center items-center order-1 md:order-2 relative">
          {/* Image background glow effect */}
          <motion.div
            variants={ZoomIn(0.3)}
            initial="initial"
            animate="animate"
            className="absolute w-[280px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-2xl shadow-lg z-0"
          />

          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute top-10 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-60" />
            <div className="absolute bottom-16 left-10 w-8 h-8 bg-blue-200 rounded-full opacity-60" />
            <div className="absolute top-1/2 left-0 w-6 h-6 bg-purple-200 rounded-full opacity-60" />
          </motion.div>

          {/* Main image with floating animation */}
          <motion.img
            src={HeroPng}
            alt="Student learning"
            className="relative z-10 w-[280px] sm:w-[350px] md:w-[400px] lg:w-[500px] drop-shadow-2xl"
            style={{ objectFit: "contain" }}
            variants={ZoomIn(0.4)}
            initial="initial"
            animate="animate"
            whileInView={{
              y: [0, -10, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />

          {/* Floating achievement badges */}
          <motion.div
            className="absolute -right-4 top-1/4 bg-white p-3 rounded-lg shadow-lg z-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileInView={{
              y: [0, -5, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">A+</div>
              <span className="text-sm font-medium">Top Results</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute -left-4 bottom-1/4 bg-white p-3 rounded-lg shadow-lg z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileInView={{
              y: [0, 5, 0],
              transition: {
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Certified Tutors</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Stats */}
      <FloatingStats />

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Wave divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f0f9ff" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,229.3C480,213,600,171,720,165.3C840,160,960,192,1080,192C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
                <h3 className="text-lg font-medium">Discover Learner Point</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {/* Replace with actual video embed */}
                <div className="text-center p-8">
                  <div className="text-5xl text-blue-600 mb-4">🎬</div>
                  <p className="text-gray-600">Video content would be embedded here</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
