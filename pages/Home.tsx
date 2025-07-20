import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"; // Added useMemo
// import { motion, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { 
  Heart, // For ProductSphere, Testimonials, InstagramFeed (all moved or to be moved) - keep if ProductSphere needs it
  ChevronRight, // For RecipeCards
  // Instagram, // Moved to InstagramFeedSection (if SectionHeading is also moved/removed)
  Sparkles, // For ProductSphere, SubscriptionBanner (moved)
  ShieldCheck, // For ProductSphere, OurStory (moved)
  Activity, // For ProductSphere, OurStory (moved)
  Check, // For ProductShowcase (moved) - remove if no other use
  Droplets, // For ProductSphere, OurStory (moved)
  ArrowDown,
  ShoppingBag,
  Sun,
  Moon,
  Clock,
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Menu,
  X,
  ArrowRight,
  // Star, // Moved
  Brain,
  Shield,
  Plus
  // Leaf, Users confirmed moved
  // ExternalLink, // Moved to HeroSection and InstagramFeedSection
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import HealthBenefitsTimeline from "../components/HealthBenefitsTimeline";
import HeroSection from "./Home/components/HeroSection";
import FeaturesSection from "./Home/components/FeaturesSection";
import ProductShowcaseSection from "./Home/components/ProductShowcaseSection";
import TestimonialsSection from "./Home/components/TestimonialsSection";
import SubscriptionBannerSection from "./Home/components/SubscriptionBannerSection";
import InstagramFeedSection from "./Home/components/InstagramFeedSection";
import { useTheme } from "../context/ThemeContext"; // Fixed import path
import { useCart } from "../context/CartContext"; // Fixed import path
import { useVisibleSections } from "../hooks/useVisibleSections"; // Fixed to named import
import styles from './Home/Home.module.css'; // Corrected CSS module import path

// Import images
// import brandYogurt from "../assets/brand yorughut.jpg"; // Moved to HeroSection
import image1 from "../assets/IMG-20250512-WA0001.jpg";
import berryRedCup from "../assets/berry red cup image.jpg";
import billboardAdvert from "../assets/billboard advert.jpg";
import boganiProfile from "../assets/bogani  profile with order now  number.jpg";
import allBottles from "../assets/bogani big  all bottles picture with flavours.jpg";
import inStores from "../assets/bogani in super markets and shops.jpg";
import kidsWithBogani from "../assets/kids with bogani big bottles.jpg";
import redCupWithStrawberries from "../assets/red cup with strawberries beside it.jpg";
import strawberryCup from "../assets/strawberry cup woth arms marketing image.png";
import vanillaImg from "../assets/vanilla.jpg";

// Define replacement variables for the missing images
const image2 = berryRedCup;
const image3 = billboardAdvert;
const image4 = boganiProfile;
const image5 = allBottles;
const image6 = inStores;
const image8 = kidsWithBogani;

// FluidGradient Component
const FluidGradient = () => {
  return <div className={styles.fluidGradient} aria-hidden="true"></div>;
};

// ProductSphere Component 
const ProductSphere = () => {
  const sphereRef = useRef(null);
  
  // Define interface for sphere items
  interface SphereItem {
    id: number;
    transform: string;
    icon: string;
  }

  const sphereItems = useMemo(() => {
    const itemCount = 12;
    const radius = 120;
    const items: SphereItem[] = []; // Explicitly type items
    
    for (let i = 0; i < itemCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / itemCount);
      const theta = Math.sqrt(itemCount * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      items.push({
        id: i,
        transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`,
        icon: i % 4 === 0 ? "ShieldCheck" : 
              i % 4 === 1 ? "Droplets" : 
              i % 4 === 2 ? "Activity" : "Sparkles"
      });
    }
    return items;
  }, []); // Empty dependency array as itemCount and radius are constant

  return (
    <div className={styles.productSphere} aria-hidden="true">
      <motion.div 
        className={styles.sphereContainer}
        ref={sphereRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {sphereItems.map(item => (
          <motion.div
            key={item.id}
            className={styles.sphereItem}
            style={{ transform: item.transform }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
          >
            {item.icon === "ShieldCheck" && <ShieldCheck className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
            {item.icon === "Activity" && <Activity className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
            {item.icon === "Droplets" && <Droplets className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
            {item.icon === "Sparkles" && <Sparkles className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// const TestimonialOrganisms = () => { ... }; // Moved to TestimonialsSection

// Type definitions
// interface SectionHeadingProps { ... } // Removed
// interface Product { ... } // Moved to useCart.ts and ProductShowcaseSection.tsx
// interface Testimonial { ... } // Moved
// interface InstagramPost { ... } // Moved

interface RecipeCardProps { // Keep if Recipe section is still here
  recipe: Recipe;
  isVisible?: boolean;
}

interface BlogPost { // Keep if Blog section is still here
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

interface Recipe { // Definition for Recipe - Note: Product type for useCart is now in useCart.ts
  title: string;
  description: string;
  image: string;
  prepTime: string;
  category: string;
  difficulty: string;
}

// Sample data
// const testimonials: Testimonial[] = [ ... ]; // Moved
// const products: Product[] = [ ... ]; // Moved
// const instagramPosts: InstagramPost[] = [ ... ]; // Moved

const recipes: Recipe[] = [ // Keep if Recipe section is still here
  {
    title: "Berry Breakfast Bowl",
    description: "Start your day with our protein-packed yogurt bowl topped with fresh berries, honey, and granola.",
    image: image4,
    prepTime: "5 min",
    category: "Breakfast",
    difficulty: "Easy"
  },
  {
    title: "Cucumber Yogurt Dip",
    description: "A refreshing tzatziki-inspired dip perfect for vegetables, pita bread, or as a sauce for grilled meats.",
    image: image5,
    prepTime: "10 min",
    category: "Appetizer",
    difficulty: "Easy"
  },
  {
    title: "Mango Lassi Smoothie",
    description: "A tropical smoothie made with our yogurt, fresh mango, and a hint of cardamom for an energy boost.",
    image: image6,
    prepTime: "7 min",
    category: "Beverage",
    difficulty: "Easy"
  }
];

const blogPosts: BlogPost[] = [ // Keep if Blog section is still here
  {
    title: "The Science Behind Probiotics",
    excerpt: "Discover how beneficial bacteria support your digestive system and overall health.",
    image: image1,
    category: "Health",
    readTime: "5 min"
  },
  {
    title: "5 Delicious Ways to Enjoy Yogurt",
    excerpt: "Creative recipes that transform your daily yogurt into exciting culinary experiences.",
    image: image2,
    category: "Recipes",
    readTime: "4 min"
  },
  {
    title: "Gut Health and Immunity Connection",
    excerpt: "How a healthy gut microbiome strengthens your immune system against common illnesses.",
    image: image3,
    category: "Wellness",
    readTime: "6 min"
  }
];

// const healthBenefits = [ ... ]; // Removed

// Stats for counter section
const statsData = [ // Keep if a stats section is still here
  { value: 20000, label: "Happy Customers", suffix: "+" },
  { value: 5, label: "Delicious Flavors", suffix: "" },
  { value: 100, label: "Local Farmers Supported", suffix: "+" },
  { value: 1.5, label: "Million Liters Produced", suffix: "M+" }
];

// Custom hooks
// const useTheme = () => { ... }; // Moved to src/hooks/useTheme.ts
// const useCart = () => { ... }; // Moved to src/hooks/useCart.ts
// const useVisibleSections = () => { ... }; // Moved to src/hooks/useVisibleSections.ts

// Helper components
// const SectionHeading: React.FC<SectionHeadingProps> = ({ ... }); // Removed

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isVisible = true }) => { // Keep if Recipe section is still here
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-full transform transition-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {recipe.category}
      </div>
    </div>
      <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {recipe.prepTime}
          </span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
            {recipe.difficulty}
          </span>
  </div>
        <h3 className="text-xl font-bold mb-2 text-emerald-700 dark:text-emerald-400">{recipe.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{recipe.description}</p>
        <a href="#" className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mt-auto inline-flex items-center hover:text-emerald-700 dark:hover:text-emerald-300">
          View Recipe <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

// Main component
const Home = () => {
  const { theme } = useTheme();
  const { cart } = useCart();
  const { visibleSections } = useVisibleSections();

  // Updated business information
  const businessInfo = {
    name: "Bogani Probiotic Yogurt",
    location: "Nairobi, Kenya",
    contact: {
      phone: "0748 913958",
      email: "boganiprobioticyogurt@gmail.com"
    },
    social: {
      facebookLikes: "7.2K",
      facebookFollowers: "7.9K"
    },
    description: "A tasty and delicious yogurt that comes in 9 mind blowing flavors guaranteed to make your taste buds dance. Supports immunity, aids digestion, and promotes gut health."
  };

  // Refs for sections 
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    benefits: useRef<HTMLElement>(null),
    features: useRef<HTMLElement>(null),
    products: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    recipes: useRef<HTMLElement>(null),
    blog: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
    instagram: useRef<HTMLElement>(null),
    subscribe: useRef<HTMLElement>(null)
  };

  // Custom hooks
const { registerSection } = useVisibleSections();
  const { theme: themeFromContext, toggleTheme } = useTheme();
  const { cartItems, addToCart } = useCart();

  // State management
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Register sections with the visibility system
  useEffect(() => {
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      registerSection(key, ref);
    });
  }, [registerSection]);

  // Simulate loading state for products
  useEffect(() => {
      setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle contact form
  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    console.log("Contact form submitted:", formData);
    
    // Clear form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
  }, [formData]);

  // Handle contact form input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

    // Scroll to section function
  const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    }
  }, []);

    // Benefits chart data for recharts
    const benefitsData = [
      {
        subject: 'Gut Health',
        A: 90,
        fullMark: 100,
      },
      {
        subject: 'Immunity',
        A: 85,
        fullMark: 100,
      },
      {
        subject: 'Digestion',
        A: 95,
        fullMark: 100,
      },
      {
        subject: 'Nutrient Absorption',
        A: 80,
        fullMark: 100,
      },
      {
        subject: 'Overall Wellness',
        A: 88,
        fullMark: 100,
      },
    ];

    // Product skeleton loader
    // const ProductSkeleton = () => ( ... ); // Moved to ProductShowcaseSection

    // Navigation items
    const navItems = [ // Keep if Navbar is still here
      { name: "Home", ref: sectionRefs.hero },
      { name: "Benefits", ref: sectionRefs.benefits },
      { name: "Features", ref: sectionRefs.features },
      { name: "Products", ref: sectionRefs.products },
      { name: "Testimonials", ref: sectionRefs.testimonials },
      { name: "Contact", ref: sectionRefs.contact }
    ];

  return (
    <div className={`${styles.home} ${theme === 'dark' ? styles.dark : ''}`}>
      {/* BiosphereStyles removed, styles imported from Home.module.css */}
      {/* The actual application of these styles (e.g. styles.glassCard) will happen in child components if they need them */}
      
      {/* Main content */}
      <main>
        {/* Hero Section */}
        <HeroSection 
          sectionRef={sectionRefs.hero}
          title={businessInfo.name}
          description={businessInfo.description}
          contactInfo={businessInfo.contact}
        />

        {/* Our Story Section - Attempting to remove this again as it should have been refactored */}
      {/*
      <section 
        ref={sectionRefs.benefits} 
        id="benefits" 
            className="py-20 bg-white dark:bg-gray-800 relative"
        aria-label="Benefits section"
      >
            <div className="container mx-auto px-4 relative z-10">
            <SectionHeading 
              title="The Bogani Difference" 
                subtitle="Discover what makes our probiotic yogurt unique and beneficial for your health."
              isVisible={visibleSections.includes('benefits')}
                highlightWord="Bogani"
              className="text-center"
                style={{ color: '#047857' }} // emerald-700
            />
            
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {healthBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                    className="glass-card p-6 text-center"
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
              
              <div className="mt-20">
                <SectionHeading 
                  title="Your Microbiome Journey" 
                  subtitle="Follow the path of how Bogani probiotics work within your body to support wellness."
                  isVisible={visibleSections.includes('benefits')}
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
      */}

        {/* Features Section */}
        <FeaturesSection sectionRef={sectionRefs.features} />

        {/* Product Showcase Section */}
        <ProductShowcaseSection
          sectionRef={sectionRefs.products}
          visibleSections={visibleSections}
          loading={loading}
          addToCart={addToCart}
        />

        {/* Testimonials Section */}
        <TestimonialsSection
          sectionRef={sectionRefs.testimonials}
          visibleSections={visibleSections}
        />

        {/* Subscription Banner */}
        <SubscriptionBannerSection sectionRef={sectionRefs.subscribe} />

        {/* Instagram Feed */}
        <InstagramFeedSection
          sectionRef={sectionRefs.instagram}
          visibleSections={visibleSections}
        />
        
        </main>
    </div>
  );
};

export default Home;