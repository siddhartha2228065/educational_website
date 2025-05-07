import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion, MotionConfig } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { CiMobile3 } from 'react-icons/ci';
import { RiComputerLine } from 'react-icons/ri';
import { IoMdHappy } from 'react-icons/io';
import { IoPulseOutline } from 'react-icons/io5';
import { BiSupport } from 'react-icons/bi';




// Complete animation type and color mapping
const animationTypeStyles = {
  zoom: {
    color: 'blue',
    gradient: 'from-blue-400 to-blue-600',
    hex: '#3B82F6',
    hoverColor: '#2563EB',
    activeHex: '#1D4ED8',
    lightBg: 'bg-blue-100',
    mediumBg: 'bg-blue-300/30',
    border: 'border-blue-300'
  },
  rotate: {
    color: 'purple',
    gradient: 'from-purple-400 to-purple-600',
    hex: '#8B5CF6',
    hoverColor: '#9333EA',
    activeHex: '#7E22CE',
    lightBg: 'bg-purple-100',
    mediumBg: 'bg-purple-300/30',
    border: 'border-purple-300'
  },
  slide: {
    color: 'green',
    gradient: 'from-green-400 to-green-600',
    hex: '#10B981',
    hoverColor: '#16A34A',
    activeHex: '#15803D',
    lightBg: 'bg-green-100',
    mediumBg: 'bg-green-300/30',
    border: 'border-green-300'
  },
  morph: {
    color: 'amber',
    gradient: 'from-yellow-400 to-yellow-600',
    hex: '#F59E0B',
    hoverColor: '#D97706',
    activeHex: '#B45309',
    lightBg: 'bg-amber-100',
    mediumBg: 'bg-amber-300/30',
    border: 'border-amber-300'
  }
};

// Enhanced service data
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
        hover: { scale: 1.05, color: "#2563EB", transition: { duration: 0.3 } }
      };
    case "rotate":
      return {
        hidden: { opacity: 0, y: 20, rotate: -5 },
        visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.05, rotate: 2, color: "#9333EA", transition: { duration: 0.3 } }
      };
    case "slide":
      return {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { x: 5, color: "#16A34A", transition: { duration: 0.3 } }
      };
    case "morph":
      return {
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.03, color: "#D97706", filter: "brightness(1.1)", transition: { duration: 0.3 } }
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

// Optimized background with will-change for better GPU usage
const AnimatedBackground = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-80"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, #3b82f620 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      {/* Conditionally render animations based on reduced motion preference */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-200 opacity-20"
            style={{ willChange: 'transform' }} // GPU acceleration hint
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-indigo-200 opacity-20"
            style={{ willChange: 'transform' }}
            animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          <motion.div
            className="absolute top-40 left-1/4 w-52 h-52 rounded-full bg-purple-200 opacity-20"
            style={{ willChange: 'transform' }}
            animate={{ x: [0, 15, 0], scale: [1, 0.95, 1] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-32 h-32 rotate-45 bg-yellow-200 opacity-20"
            style={{ willChange: 'transform' }}
            animate={{ rotate: [45, 60, 45], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
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

// Optimized ServiceCard component
const ServiceCard = memo(({ service, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
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
              duration: 4,        // Animation takes 4 seconds
              repeatDelay: 1,     // Waits 1 second before repeating
              repeat: Infinity,   // Continues indefinitely
              ease: "easeInOut",  // Smooth acceleration/deceleration
              repeatType: "loop"  // Ensures proper looping behavior
            }}
          />
        );
      case "morph":
        return (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-300/10 to-transparent pointer-events-none"
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
      <div className={`relative overflow-hidden rounded-2xl shadow-lg bg-white transition-all duration-300 group-hover:shadow-xl h-full ${expanded ? `ring-2 ring-${styles.color}-500` : ''}`}>
        {/* Card gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

        {/* Icon - Properly centered at the top */}
        <motion.div
          className="absolute top-2 left-44 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          animate={{
            y: hover && !shouldReduceMotion ? 10 : 0,
            transition: { duration: 0.5 },
          }}
        >

          <motion.div
            className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${styles.gradient} text-white shadow-lg`}
            whileHover={!shouldReduceMotion ? {
              scale: 1.15,
              rotate: service.animationType === "rotate" ? 10 : 0
            } : {}}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          >
            {service.icon}
          </motion.div>
        </motion.div>

        <div className="px-6 pt-16 pb-6 flex flex-col h-full">
          {/* Title */}
          <div className="overflow-hidden mb-3 mt-8">
            <div className="flex flex-wrap justify-center text-xl font-bold text-gray-800">
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
                  className="inline-block"
                  style={{ willChange: shouldReduceMotion ? 'opacity' : 'transform, opacity' }}
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
            className="text-gray-600 text-center mb-6"
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
                className="overflow-hidden border-t border-b border-gray-100 py-4 mb-6"
              >
                <motion.p
                  variants={textAnimationVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-gray-700 text-sm"
                >
                  {service.extendedDescription}
                </motion.p>

                {/* Animated divider */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  exit={{ width: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.2 }}
                  className={`h-0.5 my-4 bg-${styles.color}-300/50`}
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
                          delay: shouldReduceMotion ? 0.2 : 0.3 + (i * 0.1),
                          duration: 0.3
                        }
                      }}
                      exit={{ scale: shouldReduceMotion ? 0.5 : 0, transition: { duration: 0.2 } }}
                      whileHover={!shouldReduceMotion ? {
                        scale: 1.2,
                        rotate: 10,
                        transition: { duration: 0.2 }
                      } : {}}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.lightBg}`}
                      style={{ willChange: shouldReduceMotion ? 'opacity' : 'transform, opacity' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-${styles.color}-500`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        {i === 1 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        )}
                        {i === 2 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        )}
                        {i === 3 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        )}
                      </svg>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-grow"></div>

          {/* Animated divider */}
          <div className="relative h-px w-full bg-gray-200 my-4 overflow-hidden">
            <motion.div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${styles.gradient}`}
              initial={{ width: "0%" }}
              animate={{ width: hover || expanded ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
              style={{ willChange: 'width' }}
            />
          </div>

          {/* Learn more button - accessibility enhanced */}
          <motion.button
            onClick={toggleExpand}
            className={`relative px-6 py-2.5 text-white rounded-lg overflow-hidden w-full focus:outline-none focus:ring-2 focus:ring-${styles.color}-500`}
            whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
            style={{ willChange: 'transform' }}
            aria-expanded={expanded}
            aria-controls={`content-${service.id}`}
          >
            <span className={`absolute inset-0 bg-gradient-to-r ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
            <span className="relative flex items-center justify-center gap-2">
              <motion.span
                initial={{ opacity: 1 }}
                animate={!shouldReduceMotion ? {
                  opacity: [1, 0.8, 1],
                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                } : {}}
              >
                {expanded ? 'Show Less' : 'Learn More'}
              </motion.span>
              <motion.span
                className="inline-block transition-transform duration-300"
                animate={{
                  rotate: expanded ? 90 : 0,
                  x: expanded ? 0 : 4,
                  transition: { duration: shouldReduceMotion ? 0.2 : 0.3 }
                }}
              >
                <FaArrowRight className="text-sm" aria-hidden="true" />
              </motion.span>
            </span>

            {/* Shine effect - only when reduced motion is off */}
            {!shouldReduceMotion && (
              <span className="absolute top-0 left-0 w-20 h-full bg-white transform -skew-x-20 opacity-30 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
            )}

            {/* Ripple effect - only when reduced motion is off */}
            {!shouldReduceMotion && (
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0, transition: { duration: 0.5 } }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-white rounded-lg"
                  />
                )}
              </AnimatePresence>
            )}
          </motion.button>
        </div>

        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent z-10 pointer-events-none"
          animate={{ borderColor: hover ? styles.hex : 'transparent' }}
          transition={{ duration: 0.3 }}
        />

        {/* Decorative elements - conditionally rendered based on animation type */}
        {getDecorativeAnimations()}
      </div>
    </motion.div>
  );
});

// Main Services component with accessibility wrapper
const Services = () => {
  const [sectionRef, sectionVisible] = useIntersectionObserver({ once: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  // Section title animation
  const titleText = "Services We Provide";
  const titleLetters = titleText.split("");

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="w-full py-24 relative overflow-hidden"
        aria-labelledby="services-heading"
      >
        <AnimatedBackground />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-12">
            <motion.h2
              id="services-heading"
              className="text-4xl font-bold text-center relative inline-block"
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 10 : 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 }
                }
              }}
              initial="hidden"
              animate={sectionVisible ? "show" : "hidden"}
            >
              <div className="flex overflow-hidden">
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={{
                      hidden: {
                        y: shouldReduceMotion ? 0 : 50,
                        opacity: 0
                      },
                      show: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          delay: shouldReduceMotion ? 0.1 : index * 0.05,
                          duration: 0.5
                        }
                      }
                    }}
                    style={{ willChange: shouldReduceMotion ? 'opacity' : 'transform, opacity' }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>

              {/* Animated underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2"
                initial={{ width: 0 }}
                animate={sectionVisible ? { width: "100%" } : { width: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ willChange: 'width' }}
              />
            </motion.h2>
          </div>

          {/* Services grid with optimized rendering */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            animate={sectionVisible ? "show" : "hidden"}
          >
            {ServicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 10 : 30 }}
            animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 10 : 30 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20 text-center"
          >
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contact Us For More Details
            </a>
          </motion.div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,192C672,213,768,203,864,170.7C960,139,1056,85,1152,69.3C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Services;
