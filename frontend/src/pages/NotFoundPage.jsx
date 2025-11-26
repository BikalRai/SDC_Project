import { Link } from "react-router-dom";
import ReContainer from "@/components/containers/ReContainer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";

// Floating elements component
const FloatingElement = ({ delay, children, className = "" }) => (
  <motion.div
    className={className}
    initial={{ y: 0, x: 0 }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10, // Reduced for mobile
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 1,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    tap: { scale: 0.95 },
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      color: "#1a472a",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8fdf8] to-gray-50 overflow-hidden relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary/10 rounded-full blur-lg sm:blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/15 rounded-full blur-md sm:blur-lg"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary/5 rounded-full blur-xl sm:blur-2xl"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <ReContainer>
        <motion.div
          className="w-full max-w-2xl mx-auto text-center relative z-10 py-8 sm:py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        >
          {/* Error Code with floating elements */}
          <div className="relative mb-6 sm:mb-8">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary mb-3 sm:mb-4 relative"
              variants={numberVariants}
            >
              404
            </motion.h1>

            {/* Floating decorative elements - Responsive positioning */}
            <FloatingElement
              delay={0}
              className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-2xl sm:text-3xl md:text-4xl"
            >
              🛵
            </FloatingElement>
            <FloatingElement
              delay={2}
              className="absolute -top-1 -right-2 sm:-top-2 sm:-right-4 text-xl sm:text-2xl md:text-3xl"
            >
              👕
            </FloatingElement>
            <FloatingElement
              delay={4}
              className="absolute -bottom-2 left-4 sm:-bottom-4 sm:left-10 text-lg sm:text-xl md:text-2xl"
            >
              📱
            </FloatingElement>
            <FloatingElement
              delay={1}
              className="absolute -bottom-1 right-6 sm:-bottom-2 sm:right-12 text-xl sm:text-2xl md:text-3xl"
            >
              🚗
            </FloatingElement>
          </div>

          {/* Error Message */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6 px-4"
            variants={itemVariants}
          >
            Page Not Found
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-text-muted mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Oops! The page you're looking for seems to have taken a vacation.
            Don't worry, you can find plenty of amazing rentals back on our
            homepage.
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            className="mb-8 sm:mb-12 px-4"
            variants={itemVariants}
          >
            <motion.div
              className="relative inline-block"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/">
                <PrimaryButton
                  btnText="Back to Homepage"
                  className="relative z-10 text-sm sm:text-base"
                />
                <motion.div
                  className="absolute inset-0 bg-primary-dark rounded-sm z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="border-t border-gray-200 pt-6 sm:pt-8 px-4"
            variants={itemVariants}
          >
            <motion.p
              className="text-text-muted mb-4 sm:mb-6 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Quick Links
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              {[
                { to: "/rentals", label: "Browse Rentals" },
                { to: "/about", label: "About Us" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/contact", label: "Contact" },
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link
                      to={link.to}
                      className="text-primary hover:text-primary-dark transition-colors font-medium px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200 hover:border-primary/30"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute -z-10 inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </ReContainer>
    </div>
  );
};

export default NotFoundPage;