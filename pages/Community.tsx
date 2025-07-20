import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Leaf, GraduationCap, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

const Community: React.FC = () => {
  const impactAreas = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Supporting Local Farmers",
      description: "Partnering with over 100 dairy farmers across Central Kenya",
      stats: "100+ Farmers",
      details: [
        "Fair trade pricing for milk",
        "Technical training and support",
        "Sustainable farming practices",
        "Equipment and infrastructure support"
      ],
      color: "text-primaryRed",
      bgColor: "bg-primaryRed/10"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Education & Training",
      description: "Providing education on nutrition and sustainable farming",
      stats: "500+ People Trained",
      details: [
        "Nutrition awareness programs",
        "Dairy farming best practices",
        "Business skills development",
        "Youth entrepreneurship programs"
      ],
      color: "text-accentGreen",
      bgColor: "bg-accentGreen/10"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Environmental Sustainability",
      description: "Promoting eco-friendly practices and conservation",
      stats: "50% Carbon Reduction",
      details: [
        "Renewable energy adoption",
        "Water conservation programs",
        "Waste reduction initiatives",
        "Reforestation projects"
      ],
      color: "text-green-600",
      bgColor: "bg-green-600/10"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Improving community health through nutrition education",
      stats: "10,000+ Lives Impacted",
      details: [
        "School nutrition programs",
        "Community health workshops",
        "Maternal and child nutrition",
        "Probiotic health education"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-600/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              Community Impact
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building Stronger <br />
              <span className="text-yellow-200">Communities Together</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              At Bogani, we believe in creating positive change that extends far beyond our products. Discover how we're making a difference in Kenyan communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Areas Section */}
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
              Our Impact Areas
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We focus on four key areas to create lasting positive change in our communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 ${area.bgColor} rounded-2xl flex items-center justify-center`}>
                    <div className={area.color}>
                      {area.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${area.color}`}>
                      {area.stats}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {area.description}
                </p>
                <ul className="space-y-3">
                  {area.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${area.color}`} />
                      <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers Section */}
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
              Our Impact in Numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Farmers Supported" },
              { number: "10,000+", label: "Lives Impacted" },
              { number: "500+", label: "People Trained" },
              { number: "50%", label: "Carbon Reduction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primaryRed dark:text-accentGreen mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
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
              Join Our Community Impact
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of the positive change. Every purchase supports our community programs and helps build a better future for Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-primaryRed font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                Shop with Purpose
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Partner with Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community;
