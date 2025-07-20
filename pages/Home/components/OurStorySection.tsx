import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Droplets, Sparkles } from 'lucide-react';
import HealthBenefitsTimeline from '../../../components/HealthBenefitsTimeline'; // Adjusted path
import SectionHeading from '../../../components/ui/SectionHeading'; // Import shared SectionHeading
import styles from '../Home.module.css'; // Import CSS Modules

// Copied healthBenefits constant from Home.tsx
const healthBenefits = [
  {
    title: "Gut Health",
    description: "Our proprietary blend of probiotics helps maintain a healthy gut microbiome, supporting digestion and nutrient absorption.",
    icon: "ShieldCheck"
  },
  {
    title: "Immune Support",
    description: "A healthy gut plays a crucial role in immune function. Our yogurt provides beneficial bacteria that support your body's natural defenses.",
    icon: "Activity"
  },
  {
    title: "Digestive Balance",
    description: "Regular consumption of our probiotic yogurt may help reduce bloating, gas, and other digestive discomforts.",
    icon: "Droplets"
  },
  {
    title: "Nutrient Rich",
    description: "Packed with protein, calcium, and essential vitamins, our yogurt provides comprehensive nutritional benefits in every serving.",
    icon: "Sparkles"
  }
];

interface OurStorySectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  visibleSections: string[]; // Ensure this prop is used or remove if not needed directly by this component's logic
}

const OurStorySection: React.FC<OurStorySectionProps> = ({ sectionRef, visibleSections }) => {
  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="py-20 bg-white dark:bg-gray-800 relative"
      aria-label="Benefits section"
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="The Bogani Difference"
          subtitle="Discover what makes our probiotic yogurt unique and beneficial for your health."
          isVisible={visibleSections.includes('benefits')} // Pass down isVisible
          highlightWord="Bogani"
          className="text-center"
          style={{ color: '#047857' }} // emerald-700
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {healthBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className={`${styles.glassCard} p-6 text-center`}
              initial={{ opacity: 0, y: 30 }}
              animate={visibleSections.includes('benefits') ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                {benefit.icon === "ShieldCheck" && <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                {benefit.icon === "Activity" && <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                {benefit.icon === "Droplets" && <Droplets className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                {benefit.icon === "Sparkles" && <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
              </div>
              <h3 className="text-xl font-bold mb-3 text-emerald-700 dark:text-emerald-400">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Microbiome Journey Visualization */}
        <div className="mt-20">
          <SectionHeading
            title="Your Microbiome Journey"
            subtitle="Follow the path of how Bogani probiotics work within your body to support wellness."
            isVisible={visibleSections.includes('benefits')} // Pass down isVisible
            highlightWord="Microbiome"
            className="text-center"
            style={{ color: '#047857' }} // emerald-700
          />

          <div className="max-w-5xl mx-auto">
            <HealthBenefitsTimeline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
