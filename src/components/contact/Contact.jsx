import React, { useState, useEffect } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, AcademicCapIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Contact = () => {
    const [copiedEmail, setCopiedEmail] = useState(null);
    const [typedText, setTypedText] = useState('');
    const fullText = "Ready to grow with expert guidance? Reach out to us today and let's discuss how our coaching program can support your goals.";
    
    // Typing animation effect
    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 40);
            
            return () => clearTimeout(timeout);
        }
    }, [typedText]);

    const copyToClipboard = (text, cardId) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedEmail(cardId);
                setTimeout(() => setCopiedEmail(null), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Floating animation for icons
    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }
    };

    // Text scramble animation component
    const ScrambleText = ({ text }) => {
        const [scrambledText, setScrambledText] = useState(text);
        const [isInView, setIsInView] = useState(false);
        
        useEffect(() => {
            if (!isInView) return;
            
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let interval;
            let iterations = 0;
            
            interval = setInterval(() => {
                setScrambledText(prev => 
                    prev.split('').map((char, idx) => {
                        if (idx < iterations) return text[idx];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('')
                );
                
                iterations += 1/3;
                if (iterations > text.length) clearInterval(interval);
            }, 30);
            
            return () => clearInterval(interval);
        }, [isInView, text]);
        
        return (
            <motion.span 
                onViewportEnter={() => setIsInView(true)}
                className="inline-block"
            >
                {scrambledText}
            </motion.span>
        );
    };

    return (
        <>
            {/* Coaching Institute Section with Background Image */}
            <section 
                id="coaching" 
                className="py-16 px-4 relative"
                style={{
                    backgroundImage: `url('https://img.freepik.com/free-photo/abstract-blue-geometric-shapes-background_24972-1841.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/80 to-indigo-50/90"></div>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.div 
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 shiny-text">
                            Our Coaching Programs
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Specialized coaching to help you excel in competitive exams and achieve your academic goals.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Engineering Entrance Coaching */}
                        <motion.div 
                            className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-gray-200 shadow-lg transition-all hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <motion.div 
                                    className="bg-blue-100 p-3 rounded-full h-fit"
                                    animate={floatingAnimation}
                                >
                                    <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                                </motion.div>
                                <div className="flex-1">
                                    <motion.h3 
                                        className="text-xl font-bold text-gray-800"
                                        whileHover={{ color: "#3b82f6", x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <ScrambleText text="Engineering Entrance Preparation" />
                                    </motion.h3>
                                    <motion.h4 
                                        className="text-lg font-semibold text-indigo-700"
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    >
                                        JEE Main & Advanced
                                    </motion.h4>
                                    <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                                        <motion.div 
                                            className="flex items-center"
                                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        >
                                            <CalendarIcon className="h-4 w-4 mr-1" />
                                            <span>1-2 Year Programs</span>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center"
                                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        >
                                            
                                        </motion.div>
                                    </div>
                                    
                                    <motion.p 
                                        className="mt-3 text-gray-700"
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1.01, transition: { duration: 0.2 } }}
                                    >
                                        Comprehensive preparation for engineering entrance exams with focus on Physics, Chemistry, and Mathematics. Our specialized coaching includes regular mock tests, personalized feedback, and proven strategies to crack the JEE.
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Medical Entrance Coaching */}
                        <motion.div 
                            className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-gray-200 shadow-lg transition-all hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <motion.div 
                                    className="bg-green-100 p-3 rounded-full h-fit"
                                    animate={floatingAnimation}
                                >
                                    <AcademicCapIcon className="h-6 w-6 text-green-600" />
                                </motion.div>
                                <div className="flex-1">
                                    <motion.h3 
                                        className="text-xl font-bold text-gray-800"
                                        whileHover={{ color: "#10b981", x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <ScrambleText text="CBSE/ICSE Boards preparation" />
                                    </motion.h3>
                                    <motion.h4 
                                        className="text-lg font-semibold text-green-700"
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    >
                                        Advanced Preparation
                                    </motion.h4>
                                    <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                                        <motion.div 
                                            className="flex items-center"
                                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        >
                                            <CalendarIcon className="h-4 w-4 mr-1" />
                                            <span>Flexible Duration Programs</span>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center"
                                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        >
                                            
                                            
                                        </motion.div>
                                    </div>
                                    
                                    <motion.p 
                                        className="mt-3 text-gray-700"
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1.01, transition: { duration: 0.2 } }}
                                    >
                                        This coaching institute offers excellent guidance for both CBSE and ICSE boards. The teaching methods are clear, structured, and tailored to the syllabus, making complex topics easier to grasp. The faculty is supportive, and the focus on fundamentals really helps students build strong academic confidence. Highly recommended for anyone aiming for consistent improvement and exam success.
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Competitive Exams Coaching */}
                        <motion.div 
                            className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-gray-200 shadow-lg transition-all hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <motion.div 
                                    className="bg-purple-100 p-3 rounded-full h-fit"
                                    animate={floatingAnimation}
                                >
                                    <AcademicCapIcon className="h-6 w-6 text-purple-600" />
                                </motion.div>
                                <div className="flex-1">
                                    <motion.h3 
                                        className="text-xl font-bold text-gray-800"
                                        whileHover={{ color: "#8b5cf6", x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <ScrambleText text="Focusing All Subjects" />
                                    </motion.h3>
                                    <motion.h4 
                                        className="text-lg font-semibold text-purple-700"
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    >
                                        Math, Science and English
                                    </motion.h4>
                                    <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                                        <motion.div 
                                            className="flex items-center"
                                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        >
                                            <CalendarIcon className="h-4 w-4 mr-1" />
                                            <span>Flexible Duration Programs</span>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center"
                                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        >
                                            
                                        </motion.div>
                                    </div>
                                    
                                    <motion.p 
                                        className="mt-3 text-gray-700"
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1.01, transition: { duration: 0.2 } }}
                                    >
                                       We provide expert coaching in Math, Science, and English for both CBSE and ICSE students. Our Math sessions build strong problem-solving and logical thinking skills, while Science is taught with real-life examples to make concepts easy and engaging. In English, we focus on improving grammar, vocabulary, and writing to boost overall communication and academic performance.
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="mt-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <p className="text-gray-600 italic">
                            Our coaching programs focus on holistic development, including mental health support and career counseling. We don't just prepare you for exams; we prepare you for life.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section with Background Image */}
            <section
                id="contact"
                className="py-12 px-2 sm:px-4 md:px-8 min-h-screen relative overflow-hidden"
                style={{
                    backgroundImage: `url('https://img.freepik.com/free-photo/abstract-purple-geometric-shapes-background_24972-1791.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-50/90 via-white/80 to-indigo-50/90"></div>
                
                {/* Background animated elements */}
                <motion.div 
                    className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-indigo-200 mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                <motion.div 
                    className="max-w-6xl mx-auto relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div 
                        className="text-center mb-12 md:mb-16"
                        variants={titleVariants}
                    >
                        <motion.h2 
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 shiny-text"
                            style={{ backgroundSize: "200% 200%" }}
                        >
                            Get in Touch
                        </motion.h2>
                        
                        {/* TypeAnimation for dynamic text */}
                        <TypeAnimation
                            sequence={[
                                'Ready to grow with expert guidance?',
                                1000,
                                'Ready to grow with expert guidance? Reach out to us today',
                                1000,
                                'Ready to grow with expert guidance? Reach out to us today and let\'s discuss how our coaching program can support your goals.',
                                5000,
                            ]}
                            wrapper="p"
                            speed={50}
                            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                            repeat={Infinity}
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {/* Contact Information Card */}
                        <motion.div 
                            className="backdrop-blur-md bg-white/80 rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg transition-all hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-violet-700">Contact Information</h3>
                            <div className="space-y-6">
                                <motion.div 
                                    className="flex items-start gap-4"
                                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                >
                                    <motion.div 
                                        className="bg-violet-100 p-3 rounded-full"
                                        animate={floatingAnimation}
                                    >
                                        <PhoneIcon className="h-6 w-6 text-violet-600" />
                                    </motion.div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-400">Phone</p>
                                        <motion.p 
                                            className="text-base sm:text-lg text-gray-800 font-medium break-all"
                                            whileHover={{ color: "#8b5cf6", transition: { duration: 0.2 } }}
                                        >
                                            +91 79913 03202
                                        </motion.p>
                                       
                                    </div>
                                </motion.div>
                                <motion.div 
                                    className="flex items-start gap-4"
                                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                >
                                    <motion.div 
                                        className="bg-indigo-100 p-3 rounded-full"
                                        animate={floatingAnimation}
                                    >
                                        <EnvelopeIcon className="h-6 w-6 text-indigo-600" />
                                    </motion.div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-400">Email</p>
                                        <motion.a
                                            href="mailto:learnerspoint202@gmail.com"
                                            className="text-base sm:text-lg text-indigo-700 hover:text-indigo-500 transition-colors font-medium break-all"
                                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                        >
                                            learnerspoint202@gmail.com
                                        </motion.a>
                                    </div>
                                </motion.div>
                                <motion.div 
                                    className="flex items-start gap-4"
                                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                >
                                    <motion.div 
                                        className="bg-purple-100 p-3 rounded-full"
                                        animate={floatingAnimation}
                                    >
                                        <MapPinIcon className="h-6 w-6 text-purple-600" />
                                    </motion.div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-400">Location</p>
                                        <motion.p 
                                            className="text-base sm:text-lg text-gray-800 font-medium"
                                            whileHover={{ color: "#9333ea", transition: { duration: 0.2 } }}
                                        >
                                            T-16/17, 1302, Okas residency, Golf City, Sector B Ansal API, Lucknow, Hasanpur Khevali, Uttar Pradesh 226030
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </div>
                        
                        </motion.div>

                        {/* Email Me Directly Card */}
                        <motion.div 
                            className="backdrop-blur-md bg-white/80 rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg transition-all hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-indigo-700">Email Me Directly</h3>
                            <div className="space-y-8">
                                {/* First Gmail Card */}
                                <motion.div 
                                    className="bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm group transition-colors"
                                    whileHover={{ 
                                        scale: 1.02, 
                                        boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)"
                                    }}
                                    initial={{ x: -50, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
                                    viewport={{ once: true }}
                                >
                                    <div className="p-4 sm:p-6">
                                        <div className="flex items-center mb-4 gap-4">
                                            <motion.div 
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center"
                                                animate={{
                                                    boxShadow: ["0px 0px 0px rgba(79, 70, 229, 0.2)", "0px 0px 20px rgba(79, 70, 229, 0.4)", "0px 0px 0px rgba(79, 70, 229, 0.2)"],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <EnvelopeIcon className="text-indigo-600 w-6 h-6" />
                                            </motion.div>
                                            <div>
                                                <motion.h4 
                                                    className="font-semibold text-indigo-700"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    Primary Email
                                                </motion.h4>
                                                <motion.p 
                                                    className="text-xs sm:text-sm text-indigo-600 break-all"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    learnerspoint202@gmail.com
                                                </motion.p>
                                            </div>
                                        </div>
                                        <motion.p 
                                            className="text-indigo-700 text-sm sm:text-base mb-6"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            Reach out for professional inquiries, project collaborations, or any questions about my work and services.
                                        </motion.p>
                                    </div>
                                    <div className="border-t border-indigo-100 p-3 sm:p-4 bg-indigo-50 flex flex-col sm:flex-row gap-3">
                                        <motion.a
                                            href="https://mail.google.com/mail/?view=cm&fs=1&to=learnerspoint202@gmail.com.com&su=Hello+from+your+website"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-violet-700 hover:to-indigo-600 transition-all text-sm sm:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <EnvelopeIcon className="w-4 h-4 mr-2" />
                                            <span>Open Gmail</span>
                                        </motion.a>
                                        <motion.button
                                            onClick={() => copyToClipboard("learnerspoint202@gmail.com", "primary-card")}
                                            className="bg-indigo-100 hover:bg-violet-100 text-indigo-700 py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {copiedEmail === "primary-card" ? (
                                                <motion.svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="w-5 h-5 text-green-500" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </motion.svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                </svg>
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                                
                                {/* Second Gmail Card */}
                                {/* <motion.div 
                                    className="bg-violet-50 rounded-xl border border-violet-100 shadow-sm group transition-colors"
                                    whileHover={{ 
                                        scale: 1.02, 
                                        boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)"
                                    }}
                                    initial={{ x: 50, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
                                    viewport={{ once: true }}
                                >
                                    <div className="p-4 sm:p-6">
                                        <div className="flex items-center mb-4 gap-4">
                                            <motion.div 
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-violet-100 flex items-center justify-center"
                                                animate={{
                                                    boxShadow: ["0px 0px 0px rgba(124, 58, 237, 0.2)", "0px 0px 20px rgba(124, 58, 237, 0.4)", "0px 0px 0px rgba(124, 58, 237, 0.2)"],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                            >
                                                <EnvelopeIcon className="text-violet-600 w-6 h-6" />
                                            </motion.div>
                                            <div>
                                                <motion.h4 
                                                    className="font-semibold text-violet-700"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    Secondary Email
                                                </motion.h4>
                                                <motion.p 
                                                    className="text-xs sm:text-sm text-violet-600 break-all"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    sidd62601@gmail.com
                                                </motion.p>
                                            </div>
                                        </div>
                                        <motion.p 
                                            className="text-violet-700 text-sm sm:text-base mb-6"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Use this email for educational inquiries, technical discussions, or if you're a fellow developer looking to connect.
                                        </motion.p>
                                    </div>
                                    <div className="border-t border-violet-100 p-3 sm:p-4 bg-violet-50 flex flex-col sm:flex-row gap-3">
                                        <motion.a
                                            href="https://mail.google.com/mail/?view=cm&fs=1&to=sidd62601@gmail.com&su=Hello+from+your+website"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-indigo-700 hover:to-violet-600 transition-all text-sm sm:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <EnvelopeIcon className="w-4 h-4 mr-2" />
                                            <span>Open Gmail</span>
                                        </motion.a>
                                        <motion.button
                                            onClick={() => copyToClipboard("sidd62601@gmail.com", "secondary-card")}
                                            className="bg-violet-100 hover:bg-indigo-100 text-violet-700 py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {copiedEmail === "secondary-card" ? (
                                                <motion.svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="w-5 h-5 text-green-500" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </motion.svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                </svg>
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div> */}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default Contact;
