import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion, MotionConfig } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { CiMobile3 } from 'react-icons/ci';
import { RiComputerLine } from 'react-icons/ri';
import { IoMdHappy } from 'react-icons/io';
import { IoPulseOutline } from 'react-icons/io5';
import { BiSupport } from 'react-icons/bi';

// Enhanced theme-aware animation type and color mapping with improved contrast
const animationTypeStyles = {
  zoom: {
    color: 'blue',
    gradient: 'from-blue-400 to-blue-600',
    lightGradient: 'from-blue-300 to-blue-500',
    darkGradient: 'from-blue-500 to-blue-700',
    hex: '#3B82F6',
    darkHex: '#2563EB',
    hoverColor: '#2563EB',
    activeHex: '#1D4ED8',
    lightBg: 'bg-blue-100 dark:bg-blue-900/30',
    mediumBg: 'bg-blue-300/30 dark:bg-blue-700/30',
    border: 'border-blue-300 dark:border-blue-700',
    textColor: 'text-blue-700 dark:text-blue-400',
    activeBg: 'bg-blue-500 dark:bg-blue-600'
  },
  rotate: {
    color: 'purple',
    gradient: 'from-purple-400 to-purple-600',
    lightGradient: 'from-purple-300 to-purple-500',
    darkGradient: 'from-purple-500 to-purple-700',
    hex: '#8B5CF6',
    darkHex: '#7C3AED',
    hoverColor: '#9333EA',
    activeHex: '#7E22CE',
    lightBg: 'bg-purple-100 dark:bg-purple-900/30',
    mediumBg: 'bg-purple-300/30 dark:bg-purple-700/30',
    border: 'border-purple-300 dark:border-purple-700',
    textColor: 'text-purple-700 dark:text-purple-400',
    activeBg: 'bg-purple-500 dark:bg-purple-600'
  },
  slide: {
    color: 'green',
    gradient: 'from-green-400 to-green-600',
    lightGradient: 'from-green-300 to-green-500',
    darkGradient: 'from-green-500 to-green-700',
    hex: '#10B981',
    darkHex: '#059669',
    hoverColor: '#16A34A',
    activeHex: '#15803D',
    lightBg: 'bg-green-100 dark:bg-green-900/30',
    mediumBg: 'bg-green-300/30 dark:bg-green-700/30',
    border: 'border-green-300 dark:border-green-700',
    textColor: 'text-green-700 dark:text-green-400',
    activeBg: 'bg-green-500 dark:bg-green-600'
  },
  morph: {
    color: 'amber',
    gradient: 'from-amber-400 to-amber-600',
    lightGradient: 'from-amber-300 to-amber-500',
    darkGradient: 'from-amber-500 to-amber-700',
    hex: '#F59E0B',
    darkHex: '#D97706',
    hoverColor: '#D97706',
    activeHex: '#B45309',
    lightBg: 'bg-amber-100 dark:bg-amber-900/30',
    mediumBg: 'bg-amber-300/30 dark:bg-amber-700/30',
    border: 'border-amber-300 dark:border-amber-700',
    textColor: 'text-amber-700 dark:text-amber-400',
    activeBg: 'bg-amber-500 dark:bg-amber-600'
  }
};

// Enhanced service data with better accessibility
const ServicesData = [
  {
    id: 1,
    title: 'Weekly Tests',
    description: 'Regular assessments to track your progress',
    extendedDescription: 'Our weekly tests are designed to help students gauge their understanding of concepts taught during the week. These assessments provide immediate feedback, identify areas for improvement, and help build confidence through regular practice. Tests are structured to match board examination patterns, ensuring students are well-prepared for their final exams.',
    link: '#',
    icon: <TbWorldWww aria-hidden="true" className="text-3xl" />,
    animationType: "zoom"
  },
  {
    id: 2,
    title: 'Regular Assignment',
    description: 'Practical work to reinforce classroom learning',
    extendedDescription: 'Assignments are carefully crafted to reinforce concepts learned in class. They include a mix of theoretical questions and practical problems that encourage critical thinking and application of knowledge. Our assignments are designed to be challenging yet achievable, providing the right level of difficulty to stimulate growth without causing frustration.',
    link: '#',
    icon: <CiMobile3 aria-hidden="true" className="text-3xl" />,
    animationType: "rotate"
  },
  {
    id: 3,
    title: 'Doubt Solving',
    description: 'Get your questions answered by experts',
    extendedDescription: 'Our dedicated doubt-solving sessions provide students with opportunities to clarify concepts they find challenging. Experienced teachers are available to address questions in detail, using alternative explanations and examples to ensure complete understanding. Students can submit their doubts in advance or ask questions during designated doubt-clearing periods.',
    link: '#',
    icon: <RiComputerLine aria-hidden="true" className="text-3xl" />,
    animationType: "slide"
  },
  {
    id: 4,
    title: 'Friendly Environment',
    description: 'Learn in a supportive, positive atmosphere',
    extendedDescription: 'We believe learning thrives in a positive environment. Our classrooms foster mutual respect, encouragement, and collaboration. Teachers create a space where students feel comfortable asking questions and expressing their thoughts. This supportive atmosphere reduces anxiety and helps students develop confidence in their abilities.',
    link: '#',
    icon: <IoMdHappy aria-hidden="true" className="text-3xl" />,
    animationType: "morph"
  },
  {
    id: 5,
    title: 'Individual Attention',
    description: 'Personalized focus on your learning needs',
    extendedDescription: 'We maintain small batch sizes to ensure each student receives personalized attention. Our teachers identify individual learning styles and adapt their teaching methods accordingly. Regular progress monitoring allows us to provide targeted support where needed. We also offer one-on-one sessions for students who require additional help with specific topics.',
    link: '#',
    icon: <IoPulseOutline aria-hidden="true" className="text-3xl" />,
    animationType: "zoom"
  },
  {
    id: 6,
    title: 'CBSE/ICSE Board',
    description: 'Curriculum aligned with board requirements',
    extendedDescription: 'Our curriculum is meticulously aligned with CBSE and ICSE board requirements. We stay updated with the latest syllabus changes and examination patterns to ensure our teaching remains relevant. Our study materials and question banks are designed specifically to address the unique requirements of each board, helping students excel in their board examinations.',
    link: '#',
    icon: <BiSupport aria-hidden="true" className="text-3xl" />,
    animationType: "rotate"
  },
];

// Get accessibility-friendly animation variants based on reduced motion preference
const getTextAnimationVariants = (animationType, shouldReduceMotion) => {
  // For users with reduced motion preference, use only opacity animations
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
      hover: { opacity: 0.8, transition: { duration: 0.3 } }
    };
  }

  // Otherwise use the full animation variants
  switch (animationType) {
    case "zoom":
      return {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
      };
    case "rotate":
      return {
        hidden: { opacity: 0, y: 20, rotate: -5 },
        visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } }
      };
    case "slide":
      return {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { x: 5, transition: { duration: 0.3 } }
      };
    case "morph":
      return {
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.03, filter: "brightness(1.1)", transition: { duration: 0.3 } }
      };
    default:
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
      };
  }
};

// Animation variants for staggered animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Enhanced 3D background with dark mode support
const AnimatedBackground = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base layer with gradient - enhanced for dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950 dark:via-gray-900 dark:to-indigo-950 opacity-80"></div>
      
      {/* Dot pattern - visible in both modes */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
      
      {/* 3D mesh grid for enhanced depth */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Enhanced 3D decorative elements */}
      {!shouldReduceMotion && (
        <>
          {/* Floating orbs with 3D shadows */}
          <motion.div
            className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-700 opacity-20 dark:opacity-30 shadow-2xl"
            style={{ 
              willChange: 'transform',
              filter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 8px 16px rgba(255, 255, 255, 0.2)'
            }}
            animate={{ 
              y: [0, -20, 0], 
              scale: [1, 1.05, 1],
              rotateX: [0, 10, 0],
              rotateY: [0, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.div
            className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-indigo-200 dark:bg-indigo-700 opacity-20 dark:opacity-30"
            style={{ 
              willChange: 'transform',
              filter: 'blur(15px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 8px 16px rgba(255, 255, 255, 0.2)'
            }}
            animate={{ 
              y: [0, 20, 0], 
              scale: [1, 1.1, 1],
              rotateX: [0, -15, 0],
              rotateY: [0, 15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          
          <motion.div
            className="absolute top-40 left-1/4 w-52 h-52 rounded-full bg-purple-200 dark:bg-purple-700 opacity-20 dark:opacity-30"
            style={{ 
              willChange: 'transform',
              filter: 'blur(25px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 8px 16px rgba(255, 255, 255, 0.2)'
            }}
            animate={{ 
              x: [0, 15, 0], 
              scale: [1, 0.95, 1],
              rotateZ: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
          
          {/* Floating geometric shape */}
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-32 h-32 rotate-45 bg-yellow-200 dark:bg-yellow-700 opacity-20 dark:opacity-30"
            style={{ 
              willChange: 'transform',
              filter: 'blur(10px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 8px 16px rgba(255, 255, 255, 0.2)'
            }}
            animate={{ 
              rotate: [45, 60, 45], 
              scale: [1, 1.1, 1],
              z: [0, 20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Light rays effect */}
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 opacity-20 dark:opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
              willChange: 'transform'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Dark mode specific glow */}
          <motion.div 
            className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full hidden dark:block"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)',
              willChange: 'transform',
              filter: 'blur(40px)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", delay: 5 }}
          />
        </>
      )}
    </div>
  );
});

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);

      // Unobserve after becoming visible if once is true
      if (entry.isIntersecting && options.once) {
        observer.unobserve(entry.target);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || "0px",
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.once, options.threshold, options.rootMargin]);

  return [elementRef, isIntersecting];
}

// Enhanced ServiceCard component with improved contrast and persistent button color
const ServiceCard = memo(({ service, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false); // New state for persistent button color
  const shouldReduceMotion = useReducedMotion();
  const [cardRef, isVisible] = useIntersectionObserver({ once: true });
  const [visible, setVisible] = useState(false);

  // Get appropriate styles for this animation type
  const styles = animationTypeStyles[service.animationType] || animationTypeStyles.zoom;
  const textAnimationVariants = getTextAnimationVariants(service.animationType, shouldReduceMotion);
  const titleChars = service.title.split("");

  // Delayed visibility based on index for staggered entry
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setVisible(true), index * 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index]);

  // Get animation for expanded content that respects reduced motion preferences
  const getExpandedContentAnimation = () => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
      };
    }

    switch (service.animationType) {
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
          exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
        };
      case "rotate":
        return {
          initial: { opacity: 0, rotate: -5 },
          animate: { opacity: 1, rotate: 0, transition: { duration: 0.4 } },
          exit: { opacity: 0, rotate: 5, transition: { duration: 0.3 } }
        };
      case "slide":
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
        };
      case "morph":
        return {
          initial: { opacity: 0, borderRadius: "20px" },
          animate: { opacity: 1, borderRadius: "5px", transition: { duration: 0.4 } },
          exit: { opacity: 0, borderRadius: "20px", transition: { duration: 0.3 } }
        };
      default:
        return {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
          exit: { opacity: 0, height: 0, transition: { duration: 0.3 } }
        };
    }
  };

  const expandedContentAnimation = getExpandedContentAnimation();

  const toggleExpand = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setExpanded(prev => !prev);
    setButtonActive(prev => !prev); // Toggle button active state
  }, []);

  // Handle keyboard interactions for accessibility
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpand(e);
    }
  }, [toggleExpand]);

  // Generate optimized animations for decorative elements
  const getDecorativeAnimations = () => {
    if (shouldReduceMotion) return null;

    switch (service.animationType) {
      case "zoom":
        return (
          <motion.div
            className={`absolute bottom-4 left-4 w-8 h-8 rounded-full ${styles.mediumBg}`}
            style={{ willChange: 'transform, opacity' }}
            animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      case "rotate":
        return (
          <motion.div
            className={`absolute top-10 right-10 w-10 h-10 rounded-full border-2 ${styles.border}`}
            style={{ willChange: 'transform, opacity' }}
            animate={{ rotate: 360, opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        );
      case "slide":
        return (
          <motion.div
            className={`absolute top-1/2 left-0 w-full h-1 ${styles.mediumBg}`}
            style={{ willChange: 'transform, opacity' }}
            initial={{ x: "-100%" }}
            animate={{ x: "100%", opacity: [0, 0.8, 0] }}
            transition={{
              duration: 4,
              repeatDelay: 1,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop"
            }}
          />
        );
      case "morph":
        return (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-300/10 to-transparent dark:from-amber-700/10 dark:to-transparent pointer-events-none"
            animate={{
              background: [
                "linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), transparent)",
                "linear-gradient(to bottom left, rgba(251, 191, 36, 0.1), transparent)",
                "linear-gradient(to top right, rgba(251, 191, 36, 0.1), transparent)",
                "linear-gradient(to top left, rgba(251, 191, 36, 0.1), transparent)",
                "linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), transparent)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      variants={fadeInUp}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      aria-label={service.title}
      onKeyDown={handleKeyDown}
      className="relative group focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-offset-2 focus-visible:ring-2"
      style={{
        focusRingColor: styles.hex,
        touchAction: 'manipulation' // Optimized for touch devices
      }}
    >
      <div className={`relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 group-hover:shadow-xl h-full ${expanded ? `ring-2 ring-${styles.color}-500` : ''}`}>
        {/* Improved card gradient background with dark mode support */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} dark:${styles.darkGradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}></div>
        
        {/* 3D effect layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 dark:from-transparent dark:to-white/10 pointer-events-none"></div>

        {/* Icon - Properly centered at the top */}
        <motion.div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          animate={{
            y: hover && !shouldReduceMotion ? 10 : 0,
            transition: { duration: 0.5 },
          }}
        >
          <motion.div
            className={`flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${styles.gradient} dark:${styles.darkGradient} text-white shadow-lg`}
            whileHover={!shouldReduceMotion ? {
              scale: 1.15,
              rotate: service.animationType === "rotate" ? 10 : 0,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            } : {}}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          >
            {service.icon}
          </motion.div>
        </motion.div>

        <div className="px-4 sm:px-6 pt-16 pb-6 flex flex-col h-full">
          {/* Title */}
          <div className="overflow-hidden mb-3 mt-8">
            <div className="flex flex-wrap justify-center text-xl font-bold text-gray-800 dark:text-gray-100">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
                    show: custom => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: shouldReduceMotion ? 0.1 : custom * 0.04,
                        duration: 0.5
                      }
                    })
                  }}
                  whileHover={!shouldReduceMotion ? {
                    scale: 1.2,
                    color: styles.hex,
                    transition: { duration: 0.1 }
                  } : {}}
                  className={`inline-block hover:${styles.textColor}`}
                  style={{ 
                    willChange: shouldReduceMotion ? 'opacity' : 'transform, opacity',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)' // Added text shadow for better readability
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Description */}
          <motion.p
            variants={textAnimationVariants}
            whileHover="hover"
            className="text-gray-700 dark:text-gray-300 text-center mb-6"
          >
            {service.description}
          </motion.p>

          {/* Expanded content with accessibility */}
          <AnimatePresence initial={false} mode="wait">
            {expanded && (
              <motion.div
                key={`expanded-${service.id}`}
                id={`content-${service.id}`}
                aria-live="polite"
                {...expandedContentAnimation}
                className="overflow-hidden border-t border-b border-gray-100 dark:border-gray-700 py-4 mb-6"
              >
                <motion.p
                  variants={textAnimationVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-gray-800 dark:text-gray-300 text-sm"
                >
                  {service.extendedDescription}
                </motion.p>

                {/* Animated divider */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  exit={{ width: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.2 }}
                  className={`h-0.5 my-4 ${styles.mediumBg}`}
                />

                {/* Animated icons - simplified for reduced motion */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="flex justify-end space-x-2"
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: shouldReduceMotion ? 0.5 : 0 }}
                      animate={{
                        scale: 1,
                        transition: {
                          delay: shouldReduceMotion ? 0.1 : 0.3 + (i * 0.1),
                          duration: 0.3
                        }
                      }}
                      className={`w-2 h-2 rounded-full ${styles.lightBg}`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button with animated arrow and persistent color state */}
          <div className="mt-auto">
            <button
              onClick={toggleExpand}
              aria-expanded={expanded}
              aria-controls={`content-${service.id}`}
              className={`group flex items-center justify-center w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-${styles.color}-500 focus:ring-offset-2 ${
                buttonActive 
                  ? `${styles.activeBg} text-white` 
                  : `${styles.textColor} hover:bg-${styles.color}-50 dark:hover:bg-${styles.color}-900/20`
              }`}
            >
              <span>{expanded ? 'Show Less' : 'Learn More'}</span>
              <motion.span
                animate={{ x: hover && !shouldReduceMotion ? 5 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2 inline-block"
              >
                <FaArrowRight className={`transform transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </motion.span>
            </button>
          </div>
        </div>

        {/* Decorative animations */}
        {getDecorativeAnimations()}
      </div>
    </motion.div>
  );
});

// Main Services component
const Services = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-800 dark:text-gray-300"
          >
            Comprehensive educational support designed to help students excel in their academic journey
          </motion.p>
        </motion.div>
        
        <MotionConfig reducedMotion={shouldReduceMotion ? "user" : "never"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </MotionConfig>
        
      </div>

      
    </section>
  );
};

export default Services;
