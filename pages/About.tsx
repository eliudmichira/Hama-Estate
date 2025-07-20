import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Heart, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  Droplets,
  Award,
  Leaf,
  Check,
  MapPin,
  Building2,
  Users,
  Recycle,
  Coffee,
  Clock,
  ArrowDownCircle,
  Microscope,
  ShieldAlert,
  Medal,
  ChevronRight,
  ExternalLink,
  Eye
} from "lucide-react";

// Import local images
import brandYogurt from "../assets/brand yorughut.jpg";
import berryRedCup from "../assets/berry red cup image.jpg";
import billboardAdvert from "../assets/billboard advert.jpg";
import boganiProfile from "../assets/bogani  profile with order now  number.jpg";
import allBottles from "../assets/bogani big  all bottles picture with flavours.jpg";
import inStores from "../assets/bogani in super markets and shops.jpg";
import kidsWithBogani from "../assets/kids with bogani big bottles.jpg";
import redCupWithStrawberries from "../assets/red cup with strawberries beside it.jpg";
import topDownCup from "../assets/top down cup image.jpg";
import vanillaImg from "../assets/vanilla.jpg";
import vanillaWithFruits from "../assets/vanilla with fruits beside the cup.jpg";
import strawberryImage from "../assets/bogani strawberry 1 litre.jpg";
import peachImage from "../assets/bogani peach 1 litre.jpg";
import coconutImage from "../assets/bogani coconut 1 litre.jpg";
import vanillaLarge from "../assets/bogani vanila 1litre.jpg";
import smallCups from "../assets/The most preferred probiotic yogurt comes in 150ml cups .jpg";

// Timeline data
const timelineData = [
  {
    year: 2024,
    title: "Current Status",
    description: "Bogani Probiotic Yogurt continues to grow with 7.2K Facebook likes and 7.9K followers, offering 9 delicious flavors that support immunity, aid digestion, and promote gut health.",
    image: allBottles,
    icon: <Sparkles />
  },
  {
    year: 2010,
    title: "The Beginning",
    description: "Founded by Maria and David Bogani in their small family kitchen in Kiambaa, with a vision to create a healthier yogurt alternative using traditional recipes and modern probiotic science.",
    image: brandYogurt, // Changed to local image
    icon: <Calendar />
  },
  {
    year: 2013,
    title: "First Retail Store",
    description: "After growing popularity at local farmers' markets, Bogani opened its first dedicated retail store in Nairobi, introducing more Kenyans to the benefits of probiotic yogurt.",
    image: berryRedCup, // Changed to local image
    icon: <Building2 />
  },
  {
    year: 2016,
    title: "Production Facility",
    description: "To meet growing demand, Bogani invested in a state-of-the-art production facility, maintaining artisanal quality while scaling operations to reach more customers across Kenya.",
    image: allBottles, // Changed to local image
    icon: <Sparkles />
  },
  {
    year: 2019,
    title: "National Distribution",
    description: "Bogani yogurt became available in major supermarkets across Kenya, making probiotic benefits accessible to health-conscious consumers nationwide.",
    image: inStores, // Changed to local image
    icon: <Users />
  },
  {
    year: 2022,
    title: "Sustainability Initiative",
    description: "Launched our comprehensive sustainability program, partnering with local dairy farmers and implementing eco-friendly packaging to reduce our environmental footprint.",
    image: kidsWithBogani, // Changed to local image
    icon: <Recycle />
  },
  {
    year: 2024,
    title: "Innovation & Expansion",
    description: "Today, Bogani continues to innovate with new flavors and products while expanding our reach to neighboring East African countries, sharing our mission of nurturing wellness naturally.",
    image: billboardAdvert, // Changed to local image
    icon: <Sparkles />
  }
];

// Values data
const valuesData = [
  {
    title: "Health & Wellbeing",
    description: "Our probiotic yogurt supports immunity, aids digestion, and promotes gut health while delivering delicious flavors that make your taste buds dance.",
    icon: <Heart size={24} className="text-primary-dark" />
  },
  {
    title: "Sustainability",
    description: "We're committed to sustainable practices throughout our supply chain, from supporting local farmers to using eco-friendly packaging and reducing our environmental footprint.",
    icon: <Leaf size={24} className="text-accent-dark" />
  },
  {
    title: "Quality Excellence",
    description: "We never compromise on quality. From the milk we source to our rigorous testing processes, excellence is built into every step of our production journey.",
    icon: <Award size={24} className="text-primary-dark" />
  },
  {
    title: "Community",
    description: "We support local communities and invest in programs that benefit Kenyan families. Our success is measured by our positive impact on the people we serve.",
    icon: <Users size={24} className="text-accent-dark" />
  },
  {
    title: "Innovation",
    description: "We continuously explore new ways to improve our products and bring better nutrition to our customers, staying at the forefront of probiotic research.",
    icon: <Sparkles size={24} className="text-primary-dark" />
  },
  {
    title: "Taste",
    description: "We believe healthy products should be delicious, creating flavors that delight while nourishing your body with the best ingredients nature has to offer.",
    icon: <Coffee size={24} className="text-accent-dark" />
  }
];

// Production process steps
const processSteps = [
  {
    title: "Local Milk Collection",
    description: "We collect fresh milk daily from our network of local dairy farmers who share our commitment to quality and animal welfare.",
    icon: <MapPin size={24} />
  },
  {
    title: "Quality Testing",
    description: "Every batch of milk undergoes rigorous testing for purity, nutritional content, and safety before entering our production process.",
    icon: <Microscope size={24} />
  },
  {
    title: "Pasteurization",
    description: "The milk is carefully pasteurized to eliminate harmful bacteria while preserving its nutritional value and natural taste.",
    icon: <Activity size={24} />
  },
  {
    title: "Probiotic Culture",
    description: "We add our proprietary blend of live probiotic cultures, carefully selected for their health benefits and cultured under optimal conditions.",
    icon: <Droplets size={24} />
  },
  {
    title: "Fermentation",
    description: "The mixture ferments at controlled temperatures, allowing the probiotic cultures to multiply and transform the milk into yogurt with its distinctive flavor and texture.",
    icon: <Clock size={24} />
  },
  {
    title: "Natural Flavors",
    description: "We add only natural flavors and ingredients, like real vanilla and fresh strawberries, to create our delicious yogurt varieties.",
    icon: <Coffee size={24} />
  },
  {
    title: "Quality Control",
    description: "Each batch undergoes thorough testing for taste, texture, probiotic content, and safety before approval for packaging.",
    icon: <ShieldCheck size={24} />
  },
  {
    title: "Packaging",
    description: "Our yogurt is packaged in eco-friendly containers designed to maintain freshness while minimizing environmental impact.",
    icon: <Recycle size={24} />
  }
];

// Team members
const teamMembers = [
  {
    name: "Maria Bogani",
    role: "Founder & CEO",
    bio: "A nutritionist with a passion for gut health, Maria founded Bogani to make probiotic benefits accessible to all Kenyans.",
    image: brandYogurt // Changed to local image
  },
  {
    name: "David Bogani",
    role: "Co-Founder & Operations Director",
    bio: "With a background in agricultural engineering, David oversees our production processes and sustainability initiatives.",
    image: berryRedCup // Changed to local image
  },
  {
    name: "Dr. Grace Kimani",
    role: "Head of Research & Development",
    bio: "A microbiologist specializing in probiotics, Grace leads our R&D team in developing new products and improving our probiotic formulations.",
    image: vanillaImg // Changed to local image
  },
  {
    name: "James Odhiambo",
    role: "Agricultural Relations Manager",
    bio: "James works directly with our network of dairy farmers to ensure sustainable practices and the highest quality milk sourcing.",
    image: coconutImage // Changed to local image
  }
];

// Stats data
const statsData = [
  { value: 7200, label: "Facebook Likes", suffix: "+" },
  { value: 7900, label: "Facebook Followers", suffix: "+" },
  { value: 9, label: "Flavor Varieties", suffix: "" },
  { value: 2, label: "Customer Reviews", suffix: "" }
];

// Quality certifications
const certifications = [
  { name: "ISO 22000", icon: <Medal /> },
  { name: "Organic Certified", icon: <Leaf /> },
  { name: "HACCP", icon: <ShieldAlert /> }
];

// Custom hook for element tracking options
interface UseElementOnScreenOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

// Custom hook for element tracking return value
type UseElementOnScreenReturn<T extends HTMLElement = any> = [React.RefObject<T | null>, boolean];

// Custom hook for element tracking
const useElementOnScreen = <T extends HTMLElement>(options: UseElementOnScreenOptions): UseElementOnScreenReturn<T> => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// Components

// Floating shapes component (defined locally)
const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* White circles */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/5 mix-blend-overlay"
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-white/5 mix-blend-overlay"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-primaryRed/10"
        animate={{
          x: [0, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} // Fixed typo a12
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-accentGreen/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// Custom cursor component (defined locally)
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovered(true));
      el.addEventListener('mouseleave', () => setIsHovered(false));
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', () => setIsHovered(true));
        el.removeEventListener('mouseleave', () => setIsHovered(false));
      });
    };
  }, []);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primaryRed mix-blend-difference pointer-events-none z-50 hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scale: isHovered ? 1.5 : 1
      }}
      animate={{
        scale: isHovered ? 1.5 : 1
      }}
      transition={{
        scale: { duration: 0.2 }
      }}
    />
  );
};

// Counter component props
interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

// Counter component
const Counter: React.FC<CounterProps> = ({ value, suffix = "", duration = 2000 }) => {
  const [ref, isVisible] = useElementOnScreen<HTMLDivElement>({ threshold: 0.5, triggerOnce: true });
  const [count, setCount] = useState(0); // <-- Add this line

  useEffect(() => {
    if (!isVisible) return;
    
    const steps = 50;
    const stepValue = value / steps;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCount(Math.ceil(stepValue * (currentStep + 1)));
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isVisible, value, duration]);
  
  return (
    <div ref={ref} className="font-bold text-4xl md:text-5xl">
      {count}{suffix}
    </div>
  );
};

// Image reveal component props
interface ImageRevealProps {
  src: string;
  alt?: string;
  className?: string;
}

// Image reveal component
const ImageReveal: React.FC<ImageRevealProps> = ({ src, alt = "", className = "" }) => {
  const [ref, isVisible] = useElementOnScreen<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute inset-0 bg-primaryRed origin-left z-10"
        initial={{ scaleX: 1 }}
        animate={isVisible ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 }}
      />
      <motion.img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={isVisible ? { scale: 1 } : { scale: 1.2 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
      />
    </div>
  );
};

// Story Polaroid component props
interface StoryPolaroidProps {
  image: string;
  caption?: string;
  rotate?: number;
}

// Story Polaroid component
const StoryPolaroid: React.FC<StoryPolaroidProps> = ({ image, caption, rotate = 0 }) => {
  const [ref, isVisible] = useElementOnScreen<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div 
      ref={ref}
      className="max-w-xs bg-white p-2 shadow-lg"
      initial={{ opacity: 0, y: 30, rotate: rotate }}
      animate={isVisible ? { opacity: 1, y: 0, rotate: rotate } : { opacity: 0, y: 30, rotate: rotate }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.3 }}
      whileHover={{ rotate: 0, scale: 1.05, transition: { duration: 0.3 } }}
    >
      <img src={image} alt={caption} className="w-full h-auto mb-2" />
      <p className="text-center text-gray-700 text-sm italic py-2">{caption}</p>
    </motion.div>
  );
};

// Glowing Button component props
interface GlowingButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

// Glowing Button component
const GlowingButton: React.FC<GlowingButtonProps> = ({ children, href, className = "" }) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-block px-8 py-4 bg-primaryRed text-white font-bold rounded-full overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.a>
  );
};

// Section Title component props
interface SectionTitleProps {
  title: string;
  subtitle: string;
  centered?: boolean;
  light?: boolean;
}

// Section Title component
const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = true, light = false }) => {
  const [ref, isVisible] = useElementOnScreen<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  
  return (
    <motion.div 
      ref={ref}
      className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <motion.div 
        className="mb-2 relative inline-block"
        initial={{ opacity: 0, x: -20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className={`text-sm font-medium uppercase tracking-wider ${light ? 'text-accentGreen' : 'text-accentGreen'}`}>
          {subtitle}
        </span>
        <motion.div 
          className="absolute -bottom-1 left-0 h-0.5 bg-accentGreen"
          initial={{ width: 0 }}
          animate={isVisible ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </motion.div>
      
      <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-primaryRed'}`}>
        {title}
      </h2>
    </motion.div>
  );
};

// Main About component props
interface AboutProps {
  theme: 'light' | 'dark';
}

// Main About component
const About: React.FC<AboutProps> = ({ theme }) => {
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: aboutRef });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const sections = {
    hero: useElementOnScreen<HTMLDivElement>({ threshold: 0.5, triggerOnce: false }),
    story: useElementOnScreen<HTMLDivElement>({ threshold: 0.3, triggerOnce: false }),
    mission: useElementOnScreen<HTMLDivElement>({ threshold: 0.3, triggerOnce: false }),
    timeline: useElementOnScreen<HTMLDivElement>({ threshold: 0.2, triggerOnce: false }),
    values: useElementOnScreen<HTMLDivElement>({ threshold: 0.2, triggerOnce: false }),
    process: useElementOnScreen<HTMLDivElement>({ threshold: 0.1, triggerOnce: false }),
    team: useElementOnScreen<HTMLDivElement>({ threshold: 0.2, triggerOnce: false }),
    stats: useElementOnScreen<HTMLDivElement>({ threshold: 0.5, triggerOnce: false }),
    quality: useElementOnScreen<HTMLDivElement>({ threshold: 0.3, triggerOnce: false }),
    cta: useElementOnScreen<HTMLDivElement>({ threshold: 0.8, triggerOnce: false }),
  };

  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sectionEntries = Object.entries(sections);
    let currentSection = "hero";
    for (const [sectionName, sectionData] of sectionEntries) {
      const inView = sectionData[1]; // Access the inView boolean
      if (inView) {
        currentSection = sectionName;
      }
    }
    setActiveSection(currentSection);
  }, [sections]);

  // Parallax effect calculation
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Navigation dots component
  const NavigationDots = () => {
    const sections = [
      { id: 'hero', label: 'Home' },
      { id: 'story', label: 'Our Story' },
      { id: 'mission', label: 'Mission' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'values', label: 'Values' },
      { id: 'process', label: 'Process' },
      { id: 'team', label: 'Team' },
      { id: 'stats', label: 'Stats' },
      { id: 'quality', label: 'Quality' },
      { id: 'cta', label: 'CTA' }
    ];
    
    return (
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
        <ul className="space-y-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a 
                href={`#${section.id}`}
                className="group flex items-center"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  const targetElement = document.getElementById(section.id);
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <span className="relative flex h-3 w-3 mr-4">
                  <span 
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      activeSection === section.id ? 'bg-primaryRed/50' : 'bg-transparent'
                    } opacity-75`}
                  />
                  <span 
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      activeSection === section.id ? 'bg-primaryRed' : 'bg-gray-400'
                    }`}
                  />
                </span>
                <span 
                  className={`opacity-0 group-hover:opacity-100 transition-opacity text-sm ${
                    activeSection === section.id ? 'text-primaryRed font-medium' : 'text-gray-500'
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div ref={aboutRef} className="min-h-screen font-sans leading-relaxed antialiased transition-colors duration-300 overflow-hidden">
      {/* Cursor */}
      <CustomCursor />
      
      {/* Navigation dots */}
      <NavigationDots />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primaryRed origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={sections.hero[0]}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#FFF5F5] dark:bg-gray-900 text-gray-800 dark:text-white"
      >
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(213, 0, 0, 0.05) 0%, transparent 700px), radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.05) 0%, transparent 700px)'
             }}></div>
        
        {/* Floating shapes */}
        <FloatingShapes />
        
        {/* Main content */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:pr-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-1 rounded-full bg-primaryRed/10 text-primaryRed font-medium text-sm">
                  Welcome to Bogani by Tatu Milk
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-primaryRed">Nurturing</span> Wellness{" "}
                <motion.span
                  className="text-accentGreen relative inline-block"
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
                From humble beginnings to becoming Kenya's premier probiotic yogurt brand, 
                discover the passion and dedication behind Bogani's journey to improve gut health 
                and wellbeing for all Kenyans.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <GlowingButton href="#story">
                  <span>Discover Our Story</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </GlowingButton>
                
                <motion.a
                  href="#process"
                  className="inline-flex items-center px-6 py-4 font-medium border-2 border-accentGreen text-accentGreen rounded-full hover:bg-accentGreen/10 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Our Process</span>
                  <Eye className="ml-2 h-5 w-5" />
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              style={{ y: parallaxY3 }}
            >
              <motion.div 
                className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-accentGreen/10 -z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 3, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-primaryRed/10 -z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -3, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <ImageReveal 
                  src={billboardAdvert} 
                  alt="Bogani yogurt production" 
                />
                
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 p-4 backdrop-blur-sm rounded-lg shadow-lg border border-white/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primaryRed">
                      <Check className="h-5 w-5" />
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">Premium Probiotic Yogurt, Crafted in Kenya</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-primaryRed"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <a 
            href="#story"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const targetElement = document.getElementById('story');
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            }}
            className="hover:text-accentGreen transition-colors"
          >
            <ArrowDownCircle className="w-10 h-10" />
          </a>
        </motion.div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        id="story"
        ref={sections.story[0]}
        className="py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-white relative overflow-hidden"
      >
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 90% 90%, rgba(76, 175, 80, 0.05) 0%, transparent 500px), radial-gradient(circle at 10% 10%, rgba(213, 0, 0, 0.05) 0%, transparent 500px)'
             }}></div>
        
        <div className="container mx-auto px-4 relative">
          <SectionTitle 
            subtitle="Our Journey" 
            title="The Bogani Story" 
            centered={true} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative"
              style={{ y: parallaxY1 }}
            >
              <div className="grid grid-cols-2 gap-6 relative">
                <StoryPolaroid 
                  image={smallCups} 
                  caption="First Batches - 2010"
                  rotate={-5}
                />
                <StoryPolaroid 
                  image={allBottles} 
                  caption="Our Facility Today"
                  rotate={5}
                />
                <StoryPolaroid 
                  image={vanillaWithFruits} 
                  caption="Local Farmers"
                  rotate={-3}
                />
                <StoryPolaroid 
                  image={redCupWithStrawberries} 
                  caption="Product Testing"
                  rotate={3}
                />
                
                <motion.div 
                  className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full border-2 border-dashed border-accentGreen/20 -z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            <motion.div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-light">
                Bogani by Tatu Milk was born from a simple yet powerful belief: 
                <span className="text-primaryRed font-medium"> that Kenyans deserve dairy products of exceptional quality</span> that not only taste delicious but actively contribute to their health and wellbeing.
              </p>
              
              <div className="space-y-6">
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-primaryRed shadow-sm"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="italic text-gray-700 dark:text-gray-300">
                    "Our journey began in 2010 when Maria and David Bogani started experimenting with probiotic yogurt recipes in their small family kitchen in Kiambaa. With Maria's background in nutrition and David's expertise in agricultural engineering, they were determined to create a healthier yogurt alternative that maintained traditional flavors."
                  </p>
                </motion.div>
                
                <p>
                  What started as a small operation has grown into a beloved brand that maintains the same commitment to quality and health that inspired our founders. We work directly with local dairy farmers, ensuring fair practices while maintaining the highest standards for our milk supply.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full bg-primaryRed/10">
                        <Calendar className="h-4 w-4 text-primaryRed" />
                      </div>
                      <h4 className="font-medium text-primaryRed">Established</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Founded in 2010 in Kiambaa, Kenya.</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full bg-accentGreen/10">
                        <Sparkles className="h-4 w-4 text-accentGreen" />
                      </div>
                      <h4 className="font-medium text-accentGreen">Innovation</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Blending traditional methods with modern probiotic science.</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full bg-primaryRed/10">
                        <Users className="h-4 w-4 text-primaryRed" />
                      </div>
                      <h4 className="font-medium text-primaryRed">Community</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Supporting local farmers and Kenyan families.</p>
                  </motion.div>
                </div>
                
                <p>
                  Today, Bogani continues to innovate while staying true to our roots: creating delicious probiotic yogurt that supports the health of Kenyan families and the sustainability of our communities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section 
        id="mission"
        ref={sections.mission[0]}
        className="py-28 bg-[#FFF5F5] dark:bg-gray-800 text-gray-800 dark:text-white relative overflow-hidden"
      >
        <motion.div 
          className="absolute top-0 right-0 w-full h-full -z-10 opacity-10"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNEMzAwMDAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTEyYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMTIgMTJjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0xMiAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTI0IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTEyYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCAxMmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')",
            backgroundSize: "60px 60px"
          }}
        />
        
        <div className="container mx-auto px-4 relative">
          <SectionTitle 
            subtitle="Why We Exist" 
            title="Our Mission & Vision" 
            centered={true} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              initial={{ opacity: 0, y: 30, rotateY: -5 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-white"
            >
              <div className="flex items-center mb-8">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-primaryRed/10"
                >
                  <Heart 
                    className="w-8 h-8 text-primaryRed"
                  />
                </div>
                <div>
                  <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Our Purpose</span>
                  <h3 className="text-2xl font-bold text-primaryRed">Our Mission</h3>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primaryRed to-accentGreen rounded-full" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                  At Bogani, our mission is to enhance the health and wellbeing of Kenyans through delicious, 
                  nutritious probiotic dairy products. We strive to make premium nutrition accessible to all families 
                  while supporting local agriculture and sustainable practices.
                </p>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We believe that good health starts from within, and our products are designed to nurture your body's 
                natural balance. Every cup of Bogani yogurt represents our commitment to your health and 
                the health of our communities.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-primaryRed/10 text-primaryRed font-medium">Nutrition</span>
                <span className="px-3 py-1 rounded-full text-xs bg-primaryRed/10 text-primaryRed font-medium">Gut Health</span>
                <span className="px-3 py-1 rounded-full text-xs bg-primaryRed/10 text-primaryRed font-medium">Accessibility</span>
                <span className="px-3 py-1 rounded-full text-xs bg-primaryRed/10 text-primaryRed font-medium">Community</span>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              initial={{ opacity: 0, y: 30, rotateY: 5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-white"
            >
              <div className="flex items-center mb-8">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-accentGreen/10"
                >
                  <Sparkles 
                    className="w-8 h-8 text-accentGreen"
                  />
                </div>
                <div>
                  <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Our Aspiration</span>
                  <h3 className="text-2xl font-bold text-accentGreen">Our Vision</h3>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accentGreen to-primaryRed rounded-full" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                  We envision a future where probiotic nutrition is an integral part of every Kenyan household,
                  where digestive health and immunity are prioritized, and where our products play a key role in
                  preventing lifestyle diseases across the nation.
                </p>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Beyond Kenya, we aim to become a leading probiotic brand across East Africa, recognized for our innovation,
                quality, and commitment to health. We aspire to set new standards for the dairy industry while pioneering
                sustainable practices that protect our environment for future generations.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-accentGreen/10 text-accentGreen font-medium">Regional Leadership</span>
                <span className="px-3 py-1 rounded-full text-xs bg-accentGreen/10 text-accentGreen font-medium">Innovation</span>
                <span className="px-3 py-1 rounded-full text-xs bg-accentGreen/10 text-accentGreen font-medium">Sustainability</span>
                <span className="px-3 py-1 rounded-full text-xs bg-accentGreen/10 text-accentGreen font-medium">Health Promotion</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        id="timeline"
        ref={sections.timeline[0]}
        className="py-28 bg-white dark:bg-gray-900 text-gray-800 dark:text-white relative overflow-hidden"
      >
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 0% 100%, rgba(76, 175, 80, 0.05) 0%, transparent 500px), radial-gradient(circle at 100% 0%, rgba(213, 0, 0, 0.05) 0%, transparent 500px)'
             }}></div>
        
        <div className="container mx-auto px-4 relative">
          <SectionTitle 
            subtitle="Through The Years" 
            title="Our Journey" 
            centered={true} 
          />

          <div className="relative mt-20">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-4 md:left-1/2 ml-4 md:ml-0 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
              whileInView={{ height: "100%" }}
              initial={{ height: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />

            {/* Timeline events */}
            <div className="space-y-16">
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Date bubble */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-4 border-primaryRed flex items-center justify-center z-10">
                    <span className="text-sm font-bold text-primaryRed">{item.year}</span>
                  </div>

                  {/* Empty space for the other side on mobile */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 relative overflow-hidden ${
                      index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0 md:mr-auto'
                    }`}>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primaryRed to-accentGreen" />
                      
                      <div className={`flex items-center mb-4 ${
                        index % 2 === 0 ? 'md:justify-start' : 'md:justify-start'
                      }`}>
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-primaryRed/10"
                        >
                          {React.cloneElement(item.icon, { size: 20, className: "text-primaryRed" })}
                        </div>
                        <h3 className="text-xl font-bold text-primaryRed">
                          {item.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                      
                      <div className="rounded-lg overflow-hidden h-48 relative">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                          <span className="text-white text-sm font-medium">Learn More</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        id="values"
        ref={sections.values[0]}
        className="py-28 bg-primaryRed/5 dark:bg-gray-800 text-gray-800 dark:text-white relative overflow-hidden"
      >
        <motion.div 
          className="absolute top-0 left-0 w-full h-full -z-10 opacity-50"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiM0Q0FGNTAiIGZpbGwtb3BhY2l0eT0iLjEiIGN4PSIxMCIgY3k9IjEwIiByPSIyIi8+PC9nPjwvc3ZnPg==')",
            backgroundSize: "20px 20px"
          }}
        />
        
        <div className="container mx-auto px-4 relative">
          <SectionTitle 
            subtitle="What Guides Us" 
            title="Our Core Values" 
            centered={true} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {valuesData.map((value, index) => (
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primaryRed to-accentGreen transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div 
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto ${
                    index % 2 === 0 ? 'bg-primaryRed/10' : 'bg-accentGreen/10'
                  }`}
                >
                  {React.cloneElement(value.icon, { 
                    size: 28, 
                    className: index % 2 === 0 ? 'text-primaryRed' : 'text-accentGreen' 
                  })}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Production Process Section */}
      <motion.section
        id="process"
        ref={sections.process[0]}
        className="py-28 bg-white dark:bg-gray-900 text-gray-800 dark:text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative">
          <SectionTitle 
            subtitle="How We Make Magic" 
            title="Our Production Process" 
            centered={true} 
          />

          <div className="mt-16 relative">
            <motion.div 
              className="absolute top-8 left-1/2 transform -translate-x-1/2 h-[calc(100%-64px)] w-1 bg-gray-200 dark:bg-gray-700 hidden lg:block"
              whileInView={{ height: "calc(100% - 64px)" }}
              initial={{ height: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  key={index}
                  className={`relative ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left lg:transform lg:translate-y-20'}`}
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 group">
                    <div className="hidden lg:block absolute top-8 left-auto right-0 lg:left-auto lg:right-0 transform lg:translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-primaryRed flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-primaryRed">{index + 1}</span>
                    </div>
                    
                    <div className="flex flex-row lg:flex-row items-center mb-4 lg:justify-start">
                      <div className="flex items-center gap-3 lg:gap-4 w-full">
                        <div 
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                            index % 2 === 0 ? 'bg-primaryRed/10' : 'bg-accentGreen/10'
                          }`}
                        >
                          {React.cloneElement(step.icon, { 
                            size: 24, 
                            className: index % 2 === 0 ? 'text-primaryRed' : 'text-accentGreen' 
                          })}
                        </div>
                        
                        <div className={`${index % 2 === 0 ? 'lg:order-first' : 'lg:order-last'}`}>
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                              {step.title}
                            </h3>
                            <span className="lg:hidden text-xs font-bold text-white bg-primaryRed w-6 h-6 rounded-full flex items-center justify-center">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        id="stats"
        ref={sections.stats[0]}
        className="py-20 px-4 md:px-8 max-w-6xl mx-auto my-20 relative"
      >
        <motion.div 
          className="absolute bottom-0 right-0 w-64 h-64 bg-accentGreen/5 rounded-full -z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-20 left-20 w-40 h-40 bg-primaryRed/5 rounded-full -z-10"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div 
          className="rounded-3xl shadow-xl p-12 text-white relative overflow-hidden bg-gradient-to-r from-primaryRed to-red-700"
        >
          <div className="absolute inset-0 bg-gray-900 opacity-40" />
          
          <div className="relative z-10">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-medium text-sm mb-4">
                Bogani Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">By The Numbers</h2>
              <div className="w-20 h-1 bg-accentGreen mx-auto mb-4"></div>
              <p className="max-w-xl mx-auto text-white/80">Our growth and impact across Kenya since we began our journey in 2010.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {statsData.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative group"
                >
                  <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 p-6">
                    <Counter value={stat.value} suffix={stat.suffix} />
                    <div className="w-10 h-1 bg-accentGreen mx-auto my-3 transform origin-left group-hover:scale-x-150 transition-transform"></div>
                    <p className="text-white/90 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quality Control Section */}
      <motion.section
        id="quality"
        ref={sections.quality[0]}
        className="py-28 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative">
          <SectionTitle 
            subtitle="Excellence in Every Cup" 
            title="Our Quality Commitment" 
            centered={true} 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Certifications */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 group"
            >
              <div className="flex items-center justify-center h-20 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-primaryRed/10 group-hover:scale-110 transition-transform duration-300"
                >
                  <Medal className="w-8 h-8 text-primaryRed" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Certifications
              </h3>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-2 bg-accentGreen/10"
                    >
                      {React.cloneElement(cert.icon, { className: "w-8 h-8 text-accentGreen" })}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 text-center">{cert.name}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Our facility and processes meet international standards for food safety and quality management, ensuring consistent excellence.
              </p>
            </motion.div>

            {/* Testing Processes */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-20 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-primaryRed/10"
                >
                  <Microscope className="w-8 h-8 text-primaryRed" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Testing Processes
              </h3>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <Check className="mt-1 mr-3 flex-shrink-0 text-accentGreen" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Microbiological Testing</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Regular testing to ensure probiotic viability and absence of harmful bacteria.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="mt-1 mr-3 flex-shrink-0 text-accentGreen" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Nutritional Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Verification of protein, fat, and probiotic content in every batch.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="mt-1 mr-3 flex-shrink-0 text-accentGreen" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Sensory Evaluation</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Expert taste testing to ensure consistent flavor and texture profiles.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Safety Protocols */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-20 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-primaryRed/10"
                >
                  <ShieldCheck className="w-8 h-8 text-primaryRed" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Safety Protocols
              </h3>
              
              <div className="rounded-lg overflow-hidden mb-6 h-40">
                <ImageReveal 
                  src={topDownCup}
                  alt="Quality testing lab"
                />
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Our comprehensive safety system includes:
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {['Traceability', 'Cold Chain', 'Allergen Control', 'Sanitization'].map((item, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-full text-xs bg-accentGreen/10 text-accentGreen"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="team"
        ref={sections.team[0]}
        className="py-28 bg-white dark:bg-gray-900 text-gray-800 dark:text-white relative overflow-hidden"
      >
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.05) 0%, transparent 700px), radial-gradient(circle at 80% 20%, rgba(213, 0, 0, 0.05) 0%, transparent 700px)'
             }}></div>
        
        <div className="container mx-auto px-4 relative">
          <SectionTitle 
            subtitle="The People Behind Bogani" 
            title="Meet Our Team" 
            centered={true} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {teamMembers.map((member, index) => (
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group relative"
              >
                <div className="h-56 overflow-hidden relative">
                  <ImageReveal 
                    src={member.image}
                    alt={member.name}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex space-x-3 text-white">
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <div className="absolute -top-5 left-6 w-12 h-1 bg-primaryRed rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white group-hover:text-primaryRed transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className="text-sm mb-3 text-accentGreen font-medium">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        id="cta"
        ref={sections.cta[0]}
        className="py-28 px-4 md:px-8 max-w-6xl mx-auto mb-20 relative"
      >
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accentGreen/20 to-primaryRed/10 -z-10" />
          <motion.div 
            className="absolute inset-0 -z-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(76, 175, 80, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(213, 0, 0, 0.2) 0%, transparent 50%)'
            }}
          />
          
          <span className="inline-block px-4 py-1 rounded-full bg-primaryRed/10 text-primaryRed font-medium text-sm mb-4">
            Ready to Experience?
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Join The Bogani Family
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Experience the health benefits of our premium probiotic yogurt and become part of 
            our community dedicated to health and wellness.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <GlowingButton href="/products" className="shadow-xl">
              <span>Explore Our Products</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </GlowingButton>
            
            <motion.a 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 text-primaryRed border-2 border-primaryRed font-bold rounded-full shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Contact Us</span>
              <ExternalLink className="ml-2 h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;