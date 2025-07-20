import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Users, ArrowRight } from 'lucide-react'; // Ensured ArrowRight is here

interface FeaturesSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  // Add isVisible props if animations depend on section visibility handled by parent
  // For now, using whileInView for self-contained animation triggering
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ sectionRef }) => {
  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNEMzAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xMmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTEyIDEyYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMTIgMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS0yNCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xMmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAgMTJjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIvPjwvZz48L2c+PC9zdmc+')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent-green/10 text-accent-green font-medium text-sm mb-4">
            Why Choose Bogani
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">A Healthier You Starts from Within</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Our premium probiotic yogurt delivers delicious taste and essential health benefits in every spoonful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-100 dark:border-gray-700/30 h-full"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yogurt-red to-accent-green"></div>
            <div className="w-16 h-16 rounded-2xl bg-yogurt-red/10 flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-yogurt-red" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gut Health</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our specially selected probiotic cultures promote digestive health and strengthen your immune system naturally.
            </p>
            <a href="/benefits" className="inline-flex items-center text-yogurt-red hover:text-berry transition-colors font-medium">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-100 dark:border-gray-700/30 h-full"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green to-yogurt-red"></div>
            <div className="w-16 h-16 rounded-2xl bg-accent-green/10 flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8 text-accent-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Natural Ingredients</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Made with fresh milk from local Kenyan farms and natural flavors, without artificial preservatives or additives.
            </p>
            <a href="/ingredients" className="inline-flex items-center text-accent-green hover:text-green-700 transition-colors font-medium">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-100 dark:border-gray-700/30 h-full"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-berry to-cream"></div>
            <div className="w-16 h-16 rounded-2xl bg-berry/10 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-berry" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Community Impact</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Supporting local farmers and sustainable practices while investing in healthier Kenyan communities.
            </p>
            <a href="/community" className="inline-flex items-center text-berry hover:text-purple-700 transition-colors font-medium">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
