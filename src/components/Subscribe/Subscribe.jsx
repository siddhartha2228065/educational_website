import React from "react";
import { FaBell } from "react-icons/fa";
import BgImage from "../../assets/bg.png";
import { motion } from "framer-motion";

// Style for background with gradient overlay
const bgStyle = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.25)), url(${BgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  width: "100%",
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.1, duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 16px 32px rgba(0,0,0,0.35)",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const bellVariants = {
  hover: {
    rotate: [0, -15, 15, -15, 15, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const blobVariants = (delay = 0.5) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 0.5, scale: 1 },
  transition: { duration: 1.5, delay },
});

const Subscribe = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <motion.div
        style={bgStyle}
        className="w-full h-full flex items-center justify-center px-4 sm:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-16 backdrop-blur-md bg-white/20 p-8 sm:p-12 md:p-16 lg:p-20 rounded-3xl border border-white/30 w-full max-w-6xl mx-auto">
          <motion.h2
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
          >
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Comprehensive Coaching
            </span>{" "}
            For Every Student
          </motion.h2>

          <motion.p
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl font-medium"
          >
            <p>Leaners point coaching centre offers a wide array of services, including experts tutoring, personalized learning plans, and regular progress assessments to ensure student success.</p>
            From personalized attention to comprehensive study materials, Learners point coaching centre is committed to providing students with the tools and support thry need to excel.
          </motion.p>

          <motion.a
            href="#subscribe"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xl sm:text-2xl py-4 px-10 sm:px-14 rounded-full shadow-2xl"
          >
            Subscribe Now
            <motion.span variants={bellVariants} whileHover="hover">
            <FaBell className="group-hover:animate-bounce group-hover:text-lg duration-200" />
            </motion.span>
          </motion.a>

        </div>
      </motion.div>

      {/* Decorative animated blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-blue-400/20 rounded-full blur-3xl z-0"
        {...blobVariants(0.5)}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 w-[45rem] h-[45rem] bg-purple-500/20 rounded-full blur-3xl z-0"
        {...blobVariants(0.7)}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-teal-400/10 rounded-full blur-3xl z-0"
        {...blobVariants(0.9)}
      />
    </section>
  );
};

export default Subscribe;
