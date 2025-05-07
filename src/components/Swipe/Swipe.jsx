import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from "../../assets/slide_image1.webp"
import img2 from "../../assets/slide_image_2.webp"
import img3 from "../../assets/slide_image_3.webp"
import img4 from "../../assets/slide_image_4.webp"
import img5 from "../../assets/slide_image_5.webp"
import img6 from "../../assets/slide_image_6.webp"


// Educational images using placeholder images
const images = [
  {
    src: img1,
    alt: "Students collaborating in a modern classroom",
    caption: "Collaborative Learning Environments",
    description: "Our modern classrooms foster teamwork and creative problem-solving through collaborative activities."
  },
  {
    src: img2,
    alt: "Science laboratory with students conducting experiments",
    caption: "Hands-on Science Education",
    description: "Students gain practical experience through experimental learning in our fully-equipped laboratories."
  },
  {
    src: img3,
    alt: "Digital library with students using tablets",
    caption: "Digital Learning Resources",
    description: "Our comprehensive digital library provides students with access to thousands of educational resources."
  },
  {
    src: img4,
    alt: "Outdoor learning environment with students",
    caption: "Nature-Based Learning",
    description: "We believe in the power of outdoor education to inspire curiosity and environmental stewardship."
  },
  {
    src: img5,
    alt: "Virtual reality classroom experience",
    caption: "Immersive Learning Technology",
    description: "Virtual reality tools allow students to explore historical sites, biological systems, and scientific concepts."
  },
  {
    src: img6,
    alt: "Students presenting in front of class",
    caption: "Public Speaking & Presentation Skills",
    description: "We prioritize developing confident communicators through regular presentation opportunities."
  }
];

// Thumbnail component
const Thumbnail = React.memo(({ image, index, currentIndex, onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`w-20 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
      index === currentIndex ? 'ring-2 ring-blue-600 ring-offset-2 scale-105' : 'opacity-70 hover:opacity-100'
    }`}
    onClick={onClick}
  >
    <img 
      src={image.src} 
      alt={`Thumbnail ${index + 1}`}
      className="w-full h-full object-cover" 
    />
  </motion.div>
));

// Animated headline component with h2
const AnimatedHeadline = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Interactive", "Inspiring", "Innovative", "Inclusive"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="text-center mb-10">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-bold text-blue-900 mb-3 transition-all duration-700"
      >
        Educational Excellence
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center items-center mb-4"
      >
        <div className="h-1 w-20 bg-blue-600" />
        <div className="mx-3 w-3 h-3 rounded-full bg-blue-600" />
        <div className="h-1 w-20 bg-blue-600" />
      </motion.div>
      
      <div className="text-xl text-gray-700 font-medium mb-2">
        Our{" "}
        <span className="relative inline-block">
          <AnimatePresence mode="wait">
            <motion.span 
              key={words[currentWord]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-blue-600 min-w-20"
            >
              {words[currentWord]}
            </motion.span>
          </AnimatePresence>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
        </span>{" "}
        Learning Approach
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-gray-600 max-w-2xl mx-auto"
      >
        Explore our state-of-the-art facilities and innovative teaching methodologies designed to inspire the next generation of leaders and thinkers.
      </motion.p>
    </div>
  );
};

// Stats display component
const StatsDisplay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const stats = [
    { label: "Student Success Rate", value: "94%", icon: "🎓" },
    { label: "Faculty with PhDs", value: "87%", icon: "👨‍🏫" },
    { label: "Student-Teacher Ratio", value: "12:1", icon: "👥" },
    { label: "Graduate Employment", value: "96%", icon: "💼" }
  ];
  
  return (
    <motion.div 
      ref={statsRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-r from-blue-100 to-indigo-100 py-10 px-4 rounded-xl shadow-md mb-16"
    >
      <h3 className="text-2xl font-bold text-center text-blue-800 mb-8">Our Educational Impact</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Custom Simple Progress Bar Chart
const SimpleProgressChart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (chartRef.current) {
      observer.observe(chartRef.current);
    }
    
    return () => {
      if (chartRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  // Progress data
  const progressData = [
    { month: 'Jan', avgScore: 68, engagement: 65 },
    { month: 'Feb', avgScore: 72, engagement: 68 },
    { month: 'Mar', avgScore: 75, engagement: 72 },
    { month: 'Apr', avgScore: 79, engagement: 75 },
    { month: 'May', avgScore: 82, engagement: 80 },
    { month: 'Jun', avgScore: 87, engagement: 85 }
  ];

  return (
    <motion.div 
      ref={chartRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-16"
    >
      <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">Student Progress Metrics</h3>
      <p className="text-gray-600 text-center mb-6">Tracking academic achievement and student engagement over the semester</p>
      
      <div className="space-y-6">
        {progressData.map((data, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{data.month}</span>
              <div className="flex space-x-4">
                <span className="text-sm font-medium text-blue-600">Score: {data.avgScore}%</span>
                <span className="text-sm font-medium text-green-600">Engagement: {data.engagement}%</span>
              </div>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${data.avgScore}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-1">
              <motion.div 
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${data.engagement}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: "easeOut" }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center items-center mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Average Score</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Engagement Level</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function EducationalGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const trackRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const galleryRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const goToSlide = (index) => {
    const currentIdx = currentIndex;
    let newIndex = index;
    
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }
    
    setDirection(newIndex > currentIdx ? 1 : -1);
    setCurrentIndex(newIndex);
  };
  
  const handlePrev = () => {
    goToSlide(currentIndex - 1);
  };
  
  const handleNext = () => {
    goToSlide(currentIndex + 1);
  };
  
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };
  
  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = touchStartX - endX;
    
    // Swipe threshold
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    
    setIsDragging(false);
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (galleryRef.current.requestFullscreen) {
        galleryRef.current.requestFullscreen();
      } else if (galleryRef.current.webkitRequestFullscreen) {
        galleryRef.current.webkitRequestFullscreen();
      } else if (galleryRef.current.msRequestFullscreen) {
        galleryRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        handleNext();
        e.preventDefault();
      } else if (e.key === 'Home') {
        goToSlide(0);
        e.preventDefault();
      } else if (e.key === 'End') {
        goToSlide(images.length - 1);
        e.preventDefault();
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isFullscreen]);
  
  // Auto slideshow
  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [currentIndex]);
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-10 pb-20">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute top-40 right-20 w-80 h-80 bg-indigo-100 rounded-full opacity-40 blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="absolute bottom-20 left-40 w-72 h-72 bg-cyan-100 rounded-full opacity-30 blur-3xl"
        ></motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        ref={galleryRef} 
        className="max-w-6xl mx-auto my-8 px-4 relative z-10"
        role="region"
        aria-roledescription="carousel"
        aria-label="Educational image gallery"
      >
        {/* Animated headline */}
        <AnimatedHeadline />
        
        {/* Main gallery container */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl mb-16"
        >
          <div className="relative overflow-hidden h-auto rounded-lg" 
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Fullscreen button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full z-20 transition-transform duration-300 hover:scale-110"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              )}
            </motion.button>
            
            {/* Image counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm z-20 font-medium">
              {currentIndex + 1} / {images.length}
            </div>
            
            {/* Main slider */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 200 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full flex items-center justify-center bg-gray-50 min-h-[300px] md:min-h-[450px]"
              >
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentIndex].src} 
                  alt={images[currentIndex].alt} 
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                  className="w-full h-auto object-cover max-h-[70vh]"
                />
                
                {/* Caption overlay */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{images[currentIndex].caption}</h3>
                  <p className="text-sm md:text-base opacity-90">{images[currentIndex].description}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10 hover:bg-white transition-transform duration-300 hover:scale-110"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-800">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10 hover:bg-white transition-transform duration-300 hover:scale-110"
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-800">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </motion.button>
          </div>
          
          {/* Thumbnail gallery */}
          <div className="bg-gray-50 py-6 px-4 border-t border-gray-100">
            <div className="flex justify-center flex-wrap gap-3">
              {images.map((image, index) => (
                <Thumbnail 
                  key={index}
                  image={image}
                  index={index}
                  currentIndex={currentIndex}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            {/* Dot indicators */}
            <div className="flex justify-center mt-4">
              {images.map((_, index) => (
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Stats display */}
        <StatsDisplay />
        
        {/* Simple Progress Chart */}
        <SimpleProgressChart />
        
        {/* Featured Course Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced Mathematics",
                description: "Explore complex mathematical concepts with our experienced faculty.",
                icon: "➗",
                color: "blue"
              },
              {
                title: "Creative Writing",
                description: "Develop your narrative skills and literary techniques.",
                icon: "✏️",
                color: "purple"
              },
              {
                title: "Environmental Science",
                description: "Understanding our planet's ecosystems and sustainability challenges.",
                icon: "🌍",
                color: "green"
              }
            ].map((course, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${
                  course.color === "blue" ? "border-blue-500" : 
                  course.color === "purple" ? "border-purple-500" : "border-green-500"
                } transition-all duration-300`}
              >
                <div className="p-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                    className="text-3xl mb-3"
                  >
                    {course.icon}
                  </motion.div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h4>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      course.color === "blue" ? "bg-blue-500 hover:bg-blue-600" : 
                      course.color === "purple" ? "bg-purple-500 hover:bg-purple-600" : "bg-green-500 hover:bg-green-600"
                    } transition-colors duration-300`}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Educational Experience?</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of students who have accelerated their learning and achieved academic excellence with our innovative educational approach.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-md"
            >
              Schedule a Tour
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#1e3a8a" }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors duration-300 shadow-md"
            >
              Apply Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
