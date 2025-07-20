import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Zap, Brain, ArrowRight, CheckCircle } from 'lucide-react';

const Benefits: React.FC = () => {
  const healthBenefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Digestive Health",
      description: "Our probiotic cultures support healthy digestion and improve nutrient absorption",
      details: [
        "Contains Lactobacillus acidophilus for improved digestion",
        "Bifidobacterium helps alleviate bloating",
        "Promotes gut health and regular digestion",
        "Supports natural digestive processes"
      ],
      color: "text-primaryRed",
      bgColor: "bg-primaryRed/10"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Immune Support",
      description: "Strengthen your natural defenses with our carefully selected probiotic strains",
      details: [
        "Lactobacillus rhamnosus supports immune system",
        "May reduce respiratory infections",
        "Helps maintain healthy gut flora",
        "Supports natural immune response"
      ],
      color: "text-accentGreen",
      bgColor: "bg-accentGreen/10"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Nutritional Benefits",
      description: "Low-calorie, high-protein yogurt with balanced macronutrients",
      details: [
        "47 calories per 250g serving",
        "8g of protein per serving",
        "7.5g of healthy fats",
        "15g of carbohydrates"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-600/10"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quality & Purity",
      description: "Made with natural ingredients and no artificial preservatives",
      details: [
        "Natural flavoring without artificial additives",
        "Well-balanced sugar content",
        "No artificial preservatives",
        "Made with fresh, quality milk"
      ],
      color: "text-amber-600",
      bgColor: "bg-amber-600/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primaryRed via-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              Health Benefits
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Science Behind <br />
              <span className="text-yellow-200">Bogani Probiotic Yogurt</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover how Bogani's carefully selected probiotic cultures work to support your health from the inside out, with a focus on digestive health, immunity, and overall wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Four Pillars of Health
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our probiotic yogurt supports your health through these key areas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <div className={benefit.color}>
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {benefit.description}
                </p>
                <ul className="space-y-3">
                  {benefit.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${benefit.color}`} />
                      <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accentGreen to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Benefits?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your journey to better health with Bogani's probiotic yogurt today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-accentGreen font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                Shop Our Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Learn About Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
