import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import teach from "../../assets/teach.jpg";
import small from "../../assets/small.jpg";
import track from "../../assets/track.jpg";
import material from "../../assets/material.jpg";



const cardData = [
  {
    id: 1,
    title: "Expert Tutors",
    shortContent: "Learn from experienced and qualified tutors across various subjects.",
    fullContent: "Our expert tutors bring years of teaching experience and subject mastery to help you succeed academically. Whether it's math, science, language, or test prep, our tutors are committed to personalized learning and student success.",
    image: teach,
    animationType: "zoom" // Zoom animation
  },
  {
    id: 2,
    title: "Small Batches",
    shortContent: "Get individual attention in small, focused student groups.",
    fullContent: "We believe in quality over quantity. Our small batch sizes ensure every student receives personalized attention, active participation, and a more interactive learning experience. This approach helps in better understanding, faster doubt resolution, and improved academic performance.",
    image: small,
    animationType: "rotate" // Rotation animation
  },
  {
    id: 3,
    title: "Progress Tracking",
    shortContent: "Stay updated with real-time performance insights and learning milestones.",
    fullContent: "Our platform provides detailed progress tracking so students and parents can monitor learning outcomes effectively. From assignment completion to quiz scores and participation, every milestone is recorded to ensure consistent improvement. This helps in identifying strengths, addressing weak areas, and setting personalized academic goals.",
    image: track,
    animationType: "slide" // Slide animation
  },
  {
    id: 4,
    title: "Study Materials",
    shortContent: "Access high-quality notes, practice papers, and reference materials anytime.",
    fullContent: "We provide a wide range of well-organized study materials tailored to each subject and academic level. From detailed notes and solved examples to mock tests and revision guides, our resources are designed to reinforce classroom learning and boost exam preparation. All materials are available digitally for easy access anytime, anywhere.",
    image: material,
    animationType: "morph" // Morphing animation
  }
];

// Text animation variants
const textAnimationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

// Different text animation variants for each card type
const getTextAnimationVariants = (animationType) => {
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
      return textAnimationVariants;
  }
};

// Individual Card Component
const Card = ({ title, shortContent, fullContent, image, index, animationType }) => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true); // Set to true to avoid blink
  const cardRef = useRef(null);
  const controls = useAnimation();
  
  // Get custom text animation variants based on card type
  const customTextAnimationVariants = getTextAnimationVariants(animationType);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
            controls.start("visible");
          }, index * 200);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index, controls]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Define different image animation variants based on animationType
  const getImageVariants = () => {
    switch (animationType) {
      case "zoom":
        return {
          hidden: { opacity: 0.9, scale: 1.05 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.7, ease: "easeOut" }
          },
          hover: { 
            scale: 1.1,
            filter: "brightness(1.1)",
            transition: { duration: 0.4 }
          }
        };
      
      case "rotate":
        return {
          hidden: { opacity: 0.9, rotate: -5, scale: 0.95 },
          visible: { 
            opacity: 1, 
            rotate: 0,
            scale: 1,
            transition: { duration: 0.7, ease: "easeOut" }
          },
          hover: { 
            rotate: 5,
            scale: 1.05,
            filter: "contrast(1.1)",
            transition: { duration: 0.4 }
          }
        };
      
      case "slide":
        return {
          hidden: { opacity: 0.9, x: -20 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" }
          },
          hover: { 
            y: -10,
            filter: "saturate(1.3)",
            transition: { duration: 0.4 }
          }
        };
      
      case "morph":
        return {
          hidden: { opacity: 0.9, borderRadius: "10%", scale: 0.95 },
          visible: { 
            opacity: 1, 
            borderRadius: "0%",
            scale: 1,
            transition: { duration: 0.7, ease: "easeOut" }
          },
          hover: { 
            borderRadius: "10%",
            scale: 1.05,
            filter: "hue-rotate(30deg)",
            transition: { duration: 0.4 }
          }
        };
      
      default:
        return {
          hidden: { opacity: 0.9 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.7 }
          },
          hover: { 
            scale: 1.1,
            transition: { duration: 0.4 }
          }
        };
    }
  };

  // Get the appropriate image variants
  const imageVariants = getImageVariants();

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Custom animation for expanded content based on card type
  const getExpandedContentAnimation = () => {
    switch (animationType) {
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4 }
          },
          exit: { 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: 0.3 }
          }
        };
      
      case "rotate":
        return {
          initial: { opacity: 0, rotate: -5 },
          animate: { 
            opacity: 1, 
            rotate: 0,
            transition: { duration: 0.4 }
          },
          exit: { 
            opacity: 0, 
            rotate: 5,
            transition: { duration: 0.3 }
          }
        };
      
      case "slide":
        return {
          initial: { opacity: 0, x: -20 },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4 }
          },
          exit: { 
            opacity: 0, 
            x: 20,
            transition: { duration: 0.3 }
          }
        };
      
      case "morph":
        return {
          initial: { opacity: 0, borderRadius: "20px" },
          animate: { 
            opacity: 1, 
            borderRadius: "5px",
            transition: { duration: 0.4 }
          },
          exit: { 
            opacity: 0, 
            borderRadius: "20px",
            transition: { duration: 0.3 }
          }
        };
      
      default:
        return {
          initial: { opacity: 0, height: 0 },
          animate: { 
            opacity: 1, 
            height: "auto",
            transition: { duration: 0.4 }
          },
          exit: { 
            opacity: 0, 
            height: 0,
            transition: { duration: 0.3 }
          }
        };
    }
  };

  // Get expanded content animation
  const expandedContentAnimation = getExpandedContentAnimation();

  // Text character animation for title
  const titleChars = title.split("");
  
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1
          }
        }
      }}
      className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative h-80 w-full overflow-hidden">
        {/* Main image with animations - no loading overlay to avoid blink */}
        <motion.div
          className="w-full h-full"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={imageVariants}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ willChange: 'transform' }}
          />
        </motion.div>
        
        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          animate={{ 
            opacity: hover ? 0.9 : 0.7,
            background: hover 
              ? "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" 
              : "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated corner accent - different for each card */}
        <motion.div 
          className={`absolute top-0 right-0 w-20 h-20 ${
            animationType === "zoom" ? "bg-blue-500/20" :
            animationType === "rotate" ? "bg-purple-500/20" :
            animationType === "slide" ? "bg-green-500/20" :
            "bg-amber-500/20"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: 0
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ 
            clipPath: "polygon(100% 0, 0 0, 100% 100%)" 
          }}
        />
        
        {/* Image interaction hint - appears on hover with different icons per card */}
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className={`bg-black/40 backdrop-blur-sm p-3 rounded-full ${
                animationType === "zoom" ? "bg-blue-500/40" :
                animationType === "rotate" ? "bg-purple-500/40" :
                animationType === "slide" ? "bg-green-500/40" :
                "bg-amber-500/40"
              }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {animationType === "zoom" && (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  )}
                  {animationType === "rotate" && (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                    />
                  )}
                  {animationType === "slide" && (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  )}
                  {animationType === "morph" && (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  )}
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Floating animation elements - unique per card */}
        {animationType === "zoom" && (
          <motion.div 
            className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-blue-500/30"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {animationType === "rotate" && (
          <motion.div 
            className="absolute top-10 right-10 w-10 h-10 rounded-full border-2 border-purple-300"
            animate={{ 
              rotate: 360,
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
        {animationType === "slide" && (
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-1 bg-green-400/30"
            initial={{ x: "-100%" }}
            animate={{ 
              x: "100%",
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1
            }}
          />
        )}
        
        {animationType === "morph" && (
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
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      <div className="relative -mt-16 px-6">
        <motion.div 
          variants={contentVariants}
          className={`backdrop-blur-md bg-white/30 p-6 rounded-xl shadow-lg border border-white/20 transition-all duration-500 ${
            hover ? 'transform -translate-y-2 bg-white/40' : ''
          }`}
        >
          {/* Animated title with character-by-character animation */}
          <div className="overflow-hidden">
            <motion.div className="flex flex-wrap text-xl font-bold mb-2 text-gray-800">
              {titleChars.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: custom => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: custom * 0.04,
                        duration: 0.5
                      }
                    })
                  }}
                  whileHover={{
                    scale: 1.2,
                    color: animationType === "zoom" ? "#3B82F6" :
                           animationType === "rotate" ? "#8B5CF6" :
                           animationType === "slide" ? "#10B981" :
                           "#F59E0B",
                    transition: { duration: 0.1 }
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          {/* Short content with custom animation */}
          <motion.p 
            variants={customTextAnimationVariants}
            whileHover="hover"
            className="text-gray-700 mb-4"
          >
            {shortContent}
          </motion.p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                {...expandedContentAnimation}
                className="overflow-hidden"
              >
                {/* Full content with custom animation */}
                <motion.p
                  variants={customTextAnimationVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="text-gray-700 mt-4 mb-2"
                >
                  {fullContent}
                </motion.p>
                
                {/* Animated divider - unique per card */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%', transition: { duration: 0.5, delay: 0.2 } }}
                  exit={{ width: 0, transition: { duration: 0.3 } }}
                  className={`h-0.5 my-4 ${
                    animationType === "zoom" ? "bg-blue-300/50" :
                    animationType === "rotate" ? "bg-purple-300/50" :
                    animationType === "slide" ? "bg-green-300/50" :
                    "bg-amber-300/50"
                  }`}
                />
                
                {/* Animated icons in expanded content - unique per card */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="flex justify-end space-x-2"
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: 1,
                        transition: { delay: 0.3 + (i * 0.1), duration: 0.3 }
                      }}
                      exit={{ scale: 0, transition: { duration: 0.2 } }}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 10,
                        transition: { duration: 0.2 }
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        animationType === "zoom" ? "bg-blue-100" :
                        animationType === "rotate" ? "bg-purple-100" :
                        animationType === "slide" ? "bg-green-100" :
                        "bg-amber-100"
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ${
                          animationType === "zoom" ? "text-blue-500" :
                          animationType === "rotate" ? "text-purple-500" :
                          animationType === "slide" ? "text-green-500" :
                          "text-amber-500"
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {i === 1 && (
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                          />
                        )}
                        {i === 2 && (
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
                          />
                        )}
                        {i === 3 && (
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                          />
                        )}
                      </svg>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleExpand}
            className={`relative mt-4 px-6 py-2.5 text-white rounded-lg overflow-hidden ${
              expanded ? 
                animationType === "zoom" ? "bg-red-500" :
                animationType === "rotate" ? "bg-purple-600" :
                animationType === "slide" ? "bg-green-600" :
                "bg-amber-600"
              : 
                animationType === "zoom" ? "bg-blue-500" :
                animationType === "rotate" ? "bg-purple-500" :
                animationType === "slide" ? "bg-green-500" :
                "bg-amber-500"
            } group`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button background animation */}
            <span className={`absolute inset-0 ${
              expanded ? 
                animationType === "zoom" ? "bg-gradient-to-r from-red-600 to-red-400" :
                animationType === "rotate" ? "bg-gradient-to-r from-purple-700 to-purple-500" :
                animationType === "slide" ? "bg-gradient-to-r from-green-700 to-green-500" :
                "bg-gradient-to-r from-amber-700 to-amber-500"
              : 
                animationType === "zoom" ? "bg-gradient-to-r from-blue-600 to-blue-400" :
                animationType === "rotate" ? "bg-gradient-to-r from-purple-600 to-purple-400" :
                animationType === "slide" ? "bg-gradient-to-r from-green-600 to-green-400" :
                "bg-gradient-to-r from-amber-600 to-amber-400"
            } transition-opacity duration-300 opacity-0 group-hover:opacity-100`}></span>
            
            {/* Button text with icon */}
            <span className="relative flex items-center justify-center gap-2">
              {/* Animated button text */}
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: [1, 0.8, 1],
                  transition: { 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </motion.span>
              
              {/* Animated arrow icon */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={false}
                animate={{ 
                  rotate: expanded ? 180 : 0,
                  transition: { duration: 0.3 }
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </motion.svg>
            </span>
            
            {/* Button shine effect */}
            <span className="absolute top-0 left-0 w-20 h-full bg-white transform -skew-x-20 opacity-30 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
            
            {/* Button ripple effect */}
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ 
                    scale: 1.5, 
                    opacity: 0,
                    transition: { duration: 0.5 }
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-lg"
                />
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function CardSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Preload images when component mounts
  useEffect(() => {
    cardData.forEach(card => {
      const img = new Image();
      img.src = card.image;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Text animation for the section title
  const titleText = "Featured Content";
  const titleLetters = titleText.split("");

  return (
    <div ref={sectionRef} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-3">
          {visible && titleLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut"
                }
              }}
              className="inline-block text-4xl font-bold text-gray-800"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: visible ? 1 : 0, 
            scaleX: visible ? 1 : 0,
            transition: { duration: 0.7, delay: 0.3 }
          }}
          className="w-24 h-1 bg-blue-500 mx-auto mb-12"
        ></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {cardData.map((card, index) => (
            <Card
              key={card.id}
              title={card.title}
              shortContent={card.shortContent}
              fullContent={card.fullContent}
              image={card.image}
              index={index}
              animationType={card.animationType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
  
