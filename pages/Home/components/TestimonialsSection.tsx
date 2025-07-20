import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import styles from '../Home.module.css'; // Import CSS Modules

// Adjusted image paths relative to src/pages/Home/components/
import image1 from "../../../assets/IMG-20250512-WA0001.jpg";
import image2 from "../../../assets/berry red cup image.jpg";
import image3 from "../../../assets/billboard advert.jpg";

import SectionHeading from '../../../components/ui/SectionHeading'; // Import shared SectionHeading

// Define Testimonial interface
interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
  rating: number;
}

// Define TestimonialOrganisms component (copied from Home.tsx)
const TestimonialOrganisms = () => {
  return (
    <div className="relative h-full overflow-visible">
      {/* Background microorganisms */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`${styles.probioticParticle} absolute`}
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(16, 185, 129, ${Math.random() * 0.1 + 0.05})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              rotate: [0, Math.random() * 360],
              scale: [1, Math.random() * 0.5 + 0.8, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      <div
        className={`absolute -z-20 top-1/4 left-1/4 w-1/2 h-1/2 ${styles.organicBlob}`}
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 70%)' }}
      ></div>
      <div
        className={`absolute -z-20 bottom-1/4 right-1/4 w-2/5 h-2/5 ${styles.organicBlob}`}
        style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.05) 70%)' }}
      ></div>
    </div>
  );
};

// Sample testimonials data (copied from Home.tsx and image paths updated)
const testimonialsData: Testimonial[] = [
  {
    name: "Sarah Johnson",
    title: "Fitness Instructor",
    quote: "Bogani yogurt has been a game-changer for my digestive health. I've tried many probiotics, but nothing compares to the natural benefits I get from this delicious yogurt!",
    image: image1,
    rating: 5
  },
  {
    name: "Michael Chen",
    title: "Nutrition Coach",
    quote: "I recommend Bogani to all my clients. It's not just the probiotics that make it special, but the clean ingredients and authentic flavors that make it a perfect addition to any healthy diet.",
    image: image2,
    rating: 5
  },
  {
    name: "Amina Patel",
    title: "Yoga Instructor",
    quote: "Since adding Bogani to my morning routine, I've noticed significant improvements in my energy levels and overall gut health. It's now an essential part of my wellness journey.",
    image: image3,
    rating: 5
  }
];

interface TestimonialsSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  visibleSections: string[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  sectionRef,
  visibleSections,
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeTestimonial, testimonialsData.length]); // Added testimonialsData.length to dependency array

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Read what our customers love about Bogani probiotic yogurt."
          isVisible={visibleSections.includes('testimonials')}
          highlightWord="Customers"
          className="text-center"
        />

        <div className="max-w-4xl mx-auto mt-12 relative">
          <TestimonialOrganisms />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              id={`testimonial-panel-${activeTestimonial}`}
              role="tabpanel"
              aria-labelledby={`testimonial-tab-${activeTestimonial}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`${styles.glassCard} p-8 relative z-10`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg shrink-0">
                  <img
                    src={testimonialsData[activeTestimonial].image}
                    alt={`Testimonial from ${testimonialsData[activeTestimonial].name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonialsData[activeTestimonial].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                    "{testimonialsData[activeTestimonial].quote}"
                  </blockquote>

                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonialsData[activeTestimonial].name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonialsData[activeTestimonial].title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6" role="tablist">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                id={`testimonial-tab-${index}`}
                role="tab"
                aria-selected={index === activeTestimonial}
                aria-controls={`testimonial-panel-${index}`}
                className={`w-3 h-3 rounded-full transition-colors ${index === activeTestimonial ? 'bg-yogurt-red' : 'bg-gray-300 dark:bg-gray-700'}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
