import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronRight, Leaf, Droplets, ArrowRight, ExternalLink } from "lucide-react";

// Import images - adjust paths as necessary if you move this component
import brandYogurt from "../../../assets/brand yorughut.jpg"; // Adjusted path

// Props type definition (if you need to pass props)
interface HeroSectionProps {
  // Define any props here if needed, e.g., for sectionRefs
  sectionRef: React.RefObject<HTMLElement | null>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef }) => {
  // If sectionRefs.hero was used for visibility or other logic within this component,
  // you might need to manage that state here or pass relevant props.
  // For simplicity, I'm assuming the heroInView logic might be simplified or handled differently.

  return (
    <section
      ref={sectionRef} // Use the passed ref
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 z-0">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-yogurt-red/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-accent-green/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-yogurt-red/10 text-yogurt-red font-medium text-sm">
                Premium Probiotic Yogurt
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-yogurt-red">Nourish</span> Your Body,{" "}
              <motion.span
                className="text-accent-green relative inline-block"
                animate={{
                  y: [0, -5, 0],
                  rotateZ: [0, 2, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Naturally
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg"
            >
              Experience Kenya's finest probiotic yogurt, crafted with care to support your gut health and overall wellbeing with every delicious spoonful.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="/products" className="px-8 py-4 rounded-xl bg-gradient-to-r from-yogurt-red to-berry text-white text-lg font-medium shadow-lg relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-white opacity-20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Our Products
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </span>
              </a>

              <a href="/about" className="px-6 py-4 rounded-xl border-2 border-accent-green text-accent-green font-medium transition-colors hover:bg-accent-green/10 flex items-center gap-2">
                Our Story
                <ExternalLink size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-700 group">
              <img
                src={brandYogurt}
                alt="Bogani premium probiotic yogurt pot displayed with fruits and oats"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              />

              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-gray-900/80 p-4 backdrop-blur-sm rounded-lg shadow-lg border border-white/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-yogurt-red/20 flex items-center justify-center">
                      <Heart size={14} className="text-yogurt-red" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center">
                      <Leaf size={14} className="text-accent-green" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Droplets size={14} className="text-blue-500" />
                    </div>
                  </div>
                  <span className="text-gray-800 dark:text-white font-medium">Probiotic Health Benefits</span>
                </div>
              </motion.div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-accent-green/10 -z-10"></div>
            <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-yogurt-red/10 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
