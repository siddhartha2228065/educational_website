import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/hero1.jpg";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Preparing your learning journey...");

  useEffect(() => {
    // Educational loading messages that change during loading
    const messages = [
      "Preparing your learning journey...",
      "Gathering educational resources...",
      "Setting up your personalized experience...",
      "Almost there! Knowledge awaits..."
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingText(messages[messageIndex]);
    }, 1000);

    // Smoother progress animation
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const remainingProgress = 100 - prevProgress;
        const increment = Math.min(remainingProgress * 0.1, Math.random() * 5);
        const newProgress = prevProgress + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, []);

  const useCounter = (value) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      setDisplayValue(Math.floor(value));
    }, [value]);

    return displayValue;
  };

  const displayProgress = useCounter(progress);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900"
        >
          {/* Animated floating elements - books, pencils, graduation caps */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white opacity-20"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 50,
                  rotate: Math.random() * 360,
                  scale: 0.5 + Math.random() * 1.5
                }}
                animate={{ 
                  y: -100,
                  rotate: Math.random() * 360,
                  transition: { 
                    duration: 10 + Math.random() * 20,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }
                }}
                style={{ fontSize: `${20 + Math.random() * 30}px` }}
              >
                {["📚", "✏️", "🎓", "🔍", "📝", "🧠"][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>

          {/* Animated background circles */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.15 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
            <div className="w-72 h-72 rounded-full bg-indigo-400 blur-2xl absolute" />
            <div className="w-56 h-56 rounded-full bg-purple-300 blur-xl absolute" />
          </motion.div>

          {/* Logo Container */}
          <motion.div
            className="relative w-40 h-40 mb-8 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 rounded-full opacity-60 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 blur-lg animate-pulse"></div>

            {/* Logo container with gradient border */}
            <div className="absolute inset-0 p-[3px] rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
              <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-white rounded-full">
                <motion.img
                  src={logo}
                  alt="Educational Institution Logo"
                  className="object-contain w-full h-full rounded-full"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 text-2xl font-bold text-white z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Learners Point Coaching Centre
          </motion.h1>

          {/* Progress bar with enhanced design */}
          <motion.div
            className="relative w-64 h-3 overflow-hidden bg-blue-900/50 rounded-full z-10 backdrop-blur-sm"
            initial={{ width: 0 }}
            animate={{ width: "16rem" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"
              style={{ width: `${progress}%` }}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 opacity-30 bg-[length:10px_10px] bg-gradient-to-r from-black/10 to-white/10" />
          </motion.div>

          {/* Progress percentage */}
          <motion.div
            className="mt-4 text-lg font-semibold tracking-wider text-white z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {displayProgress}%
          </motion.div>

          {/* Loading text with professional animation */}
          <motion.div
            className="mt-2 font-medium text-blue-200 z-10 text-center max-w-md px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              key={loadingText}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-blue-200"
            >
              {loadingText}
            </motion.div>
          </motion.div>

          {/* Educational quote */}
          <motion.div
            className="mt-8 text-sm italic text-blue-300/70 max-w-md text-center z-10 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
