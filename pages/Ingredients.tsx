import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Award, Users, Droplets, Sun, ArrowRight, CheckCircle } from 'lucide-react';

const Ingredients: React.FC = () => {
  const ingredients = [
    {
      name: "Fresh Kenyan Milk",
      description: "Sourced from local dairy farms in the Central Kenya highlands",
      benefits: [
        "High in protein and calcium",
        "Rich in vitamins A, D, and B12",
        "Supports local farming communities",
        "Hormone and antibiotic-free"
      ],
      icon: <Droplets className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10"
    },
    {
      name: "Live Probiotic Cultures",
      description: "Carefully selected beneficial bacteria strains",
      benefits: [
        "Lactobacillus acidophilus",
        "Bifidobacterium bifidum",
        "Lactobacillus casei",
        "Streptococcus thermophilus"
      ],
      icon: <Award className="w-8 h-8" />,
      color: "text-primaryRed",
      bgColor: "bg-primaryRed/10"
    },
    {
      name: "Natural Fruit Flavors",
      description: "Real fruit extracts and natural flavoring",
      benefits: [
        "No artificial colors or flavors",
        "Rich in antioxidants",
        "Vitamin C and fiber",
        "Locally sourced when possible"
      ],
      icon: <Sun className="w-8 h-8" />,
      color: "text-amber-600",
      bgColor: "bg-amber-600/10"
    },
    {
      name: "Natural Sweeteners",
      description: "Minimal added sugars from natural sources",
      benefits: [
        "Lower glycemic index",
        "No high fructose corn syrup",
        "Supports stable blood sugar",
        "Natural cane sugar only"
      ],
      icon: <Leaf className="w-8 h-8" />,
      color: "text-accentGreen",
      bgColor: "bg-accentGreen/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accentGreen via-green-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              Natural Ingredients
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pure, Natural, <br />
              <span className="text-yellow-200">Kenyan Goodness</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover the carefully selected natural ingredients that make Bogani yogurt a healthy choice for you and your family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Ingredients Section */}
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
              What Goes Into Every Cup
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We believe in transparency. Here's exactly what makes our yogurt special.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 ${ingredient.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <div className={ingredient.color}>
                    {ingredient.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {ingredient.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {ingredient.description}
                </p>
                <ul className="space-y-3">
                  {ingredient.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${ingredient.color}`} />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Source Map Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              From Farm to Table
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our ingredients travel a short distance from local Kenyan farms to your table, ensuring freshness and supporting local communities.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-accentGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-accentGreen" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Central Kenya Highlands
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our milk comes from dairy farms in the fertile highlands, known for producing high-quality milk.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-primaryRed/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primaryRed" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Quality Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our state-of-the-art facility in Kiambaa ensures the highest quality standards.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Table
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fresh, nutritious yogurt delivered to stores across Kenya within days of production.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primaryRed to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Taste the Natural Difference
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the pure, natural taste of Bogani yogurt made with the finest Kenyan ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-primaryRed font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                Shop Our Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
              <motion.a
                href="/community"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Our Community Impact
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ingredients;
