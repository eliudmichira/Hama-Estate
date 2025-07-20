import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, ArrowRight } from 'lucide-react';

// Import images - these paths will need to be relative to this new file's location
// Assuming assets are in src/assets. The new path would be ../../../assets/
import image1 from "../../../assets/IMG-20250512-WA0001.jpg"; // Example, adjust as needed
import image2 from "../../../assets/berry red cup image.jpg";
import image3 from "../../../assets/billboard advert.jpg";
import vanillaImg from "../../../assets/vanilla.jpg";


import SectionHeading from '../../../components/ui/SectionHeading'; // Import shared SectionHeading

// Define Product interface
interface Product {
  name: string;
  description: string;
  image: string;
  price: number;
  icon?: string;
  tags?: string[];
  isNew?: boolean;
  benefits?: string[];
  [key: string]: any;
}

// Define ProductSkeleton (copied from Home.tsx)
const ProductSkeleton = () => (
  <div className="rounded-lg bg-white dark:bg-gray-800 shadow-md p-4 h-full animate-pulse">
    <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-12 h-12 mb-4"></div>
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
    </div>
    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto my-4"></div>
    <div className="flex justify-between items-center mt-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
  </div>
);

// Sample products data (copied from Home.tsx)
const productsData: Product[] = [
  {
    name: "Classic Natural",
    description: "Our signature plain yogurt, rich in probiotics with a creamy texture and tangy flavor.",
    image: image1, // Using imported image
    price: 220.00,
    tags: ["No Sugar Added", "High Protein", "Probiotic"],
    isNew: false,
    benefits: ["Digestive Health", "High Protein", "No Added Sugar"]
  },
  {
    name: "Wild Berry Blend",
    description: "A delicious mix of strawberries, blueberries, and blackberries with our probiotic yogurt.",
    image: image2, // Using imported image
    price: 250.00,
    tags: ["Natural Flavors", "Low Sugar", "Antioxidants"],
    isNew: true,
    benefits: ["Rich in Vitamin C", "Real Fruit", "No Artificial Colors"]
  },
  {
    name: "Tropical Mango",
    description: "Sweet, juicy mangoes blended with our creamy probiotic yogurt for a taste of the tropics.",
    image: image3, // Using imported image
    price: 250.00,
    tags: ["Vitamin C", "Natural Flavors", "Digestive Health"],
    isNew: false,
    benefits: ["Immune Support", "Rich in Vitamins", "Gut Friendly"]
  },
  {
    name: "Greek Style Protein+",
    description: "High-protein Greek style yogurt perfect for fitness enthusiasts and active lifestyles.",
    image: vanillaImg, // Using imported image
    price: 280.00,
    tags: ["High Protein", "Low Fat"],
    isNew: false,
    benefits: ["20g Protein", "Muscle Recovery", "Satiating"]
  }
];

interface ProductShowcaseSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  visibleSections: string[];
  loading: boolean;
  addToCart: (item: { id: string; name: string; description: string; price: number; image: string; quantity: number }) => void;
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  sectionRef,
  visibleSections,
  loading,
  addToCart,
}) => {
  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Our Premium Products"
          subtitle="Discover our range of delicious probiotic yogurts made with the finest ingredients."
          isVisible={visibleSections.includes('products')}
          highlightWord="Premium"
          className="text-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            productsData.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.name}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-56 bg-gradient-to-r from-yogurt-red/10 to-accent-green/10 p-4 flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 object-contain"
                    loading="lazy"
                  />
                </motion.div>

                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white dark:bg-gray-900 text-xs font-medium rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {product.isNew && (
                  <div className="absolute top-3 right-3 bg-yogurt-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    NEW
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.benefits && product.benefits.map((benefit: string) => (
                    <span key={benefit} className="inline-flex items-center px-2 py-1 text-xs bg-accent-green/10 text-accent-green rounded-full">
                      <Check className="w-3 h-3 mr-1" /> {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 mt-auto">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  KES {product.price.toFixed(2)}
                </div>
                <button
                  className="px-4 py-2 bg-accent-green text-white rounded-xl hover:bg-accent-green/90 transition-colors flex items-center gap-2"
                  onClick={() => addToCart({
                    id: product.name, // Using product.name as a temporary ID
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                  })}
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow font-medium text-gray-900 dark:text-white"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
