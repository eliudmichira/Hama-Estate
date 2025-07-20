import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// Custom CSS for range sliders and theme-aware styling
const sliderStyles = `
  .slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: 2px solid var(--color-background);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }
  
  .slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .slider-thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: 2px solid var(--color-background);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }
  
  .slider-thumb::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .slider-thumb::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: 2px solid var(--color-background);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }
  
  .slider-thumb::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* Theme-aware focus styles */
  .slider-thumb:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .slider-thumb {
      border-width: 3px;
      box-shadow: 0 0 0 1px var(--color-on-surface);
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .slider-thumb,
    .slider-thumb::-webkit-slider-thumb,
    .slider-thumb::-moz-range-thumb {
      transition: none;
    }
    
    .mobile-card .perspective-1000 {
      perspective: none;
    }
    
    .mobile-card .transform-style-3d {
      transform-style: flat;
    }
    
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  @media (max-width: 768px) {
    .mobile-card {
      height: auto !important;
      min-height: 320px;
    }
    
    .mobile-card .perspective-1000 {
      perspective: none;
    }
    
    .mobile-card .transform-style-3d {
      transform-style: flat;
    }
    
    /* Touch-friendly sizing */
    .mobile-touch-target {
      min-height: 44px;
      min-width: 44px;
    }
  }
  
  /* Print styles */
  @media print {
    .no-print {
      display: none !important;
    }
    
    .print-friendly {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }
  }
`;

// Inject styles with theme awareness
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = sliderStyles;
  document.head.appendChild(styleSheet);
}
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Heart, 
  Star,
  X,
  Search,
  Filter,
  ChevronDown,
  Check,
  ShoppingCart,
  Plus,
  Minus,
  ArrowUpRight,
  Sparkles,
  Leaf,
  Droplets,
  Share2,
  ChevronRight,
  Info,
  ChevronUp,
  Eye,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Clock,
  Truck,
  Package,
  Grid,
  List,
  SlidersHorizontal,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Share,
  Download,
  Bookmark,
  Gift,
  CreditCard,
  Smartphone,
  Headphones,
  MapPin,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  ExternalLink,
  Copy,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader,
  RefreshCw,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

// Import product images
import strawberryCup from "../assets/red cup with strawberries beside it.jpg";
import strawberryBottle from "../assets/bogani strawberry 1 litre.jpg";
import vanillaBottle from "../assets/bogani vanila 1litre.jpg";
import peachBottle from "../assets/bogani peach 1 litre.jpg";
import coconutBottle from "../assets/bogani coconut 1 litre.jpg";
import brandYogurt from "../assets/brand yorughut.jpg";
import topDownCup from "../assets/top down cup image.jpg";
import berryRedCup from "../assets/berry red cup image.jpg";
import vanillaFruits from "../assets/vanilla with fruits beside the cup.jpg";
import allBottles from "../assets/bogani big  all bottles picture with flavours.jpg";
import vanillaPlain from "../assets/vanilla.jpg";
import inStores from "../assets/bogani in super markets and shops.jpg";

// Define TypeScript interfaces for our data structures
interface ProductSize {
  size: string;
  price: number;
}

interface ProductNutrition {
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
  probiotics: string;
}

export interface Product {
  id: number;
  name: string;
  type: string;
  category: string;
  flavor: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  colorCode: string;
  price: number;
  originalPrice?: number; // For sale pricing
  rating: number;
  reviews: number;
  description: string;
  longDescription?: string; // Detailed description for quick view
  sizes: ProductSize[];
  benefits: string[];
  nutrition: ProductNutrition;
  featured: boolean;
  new: boolean;
  bestseller?: boolean;
  organic?: boolean;
  glutenFree?: boolean;
  vegan?: boolean;
  lowSugar?: boolean;
  highProtein?: boolean;
  inStock?: boolean;
  stockCount?: number;
  tags?: string[];
  ingredients?: string[];
  allergens?: string[];
}

// Product data with proper typing
export const productsData: Product[] = [
  { 
    id: 1, 
    name: "Bogani Vanilla Probiotic Yogurt", 
    type: "Probiotic Yogurt",
    category: "Dairy",
    flavor: "Vanilla",
    image: vanillaBottle,
    colorCode: "#F5E6D3",
    price: 140,
    rating: 4.2,
    reviews: 2,
    description: "A tangy probiotic yogurt with subtle vanilla flavor, supporting gut health and immunity.",
    longDescription: "Bogani Vanilla Probiotic Yogurt is a health-focused dairy product that emphasizes the benefits of live probiotic cultures. The vanilla flavor is subtle, highlighting the dairy base rather than overpowering it. The texture is thick but not particularly creamy, making it ideal for those prioritizing gut health.",
    sizes: [
      { size: "1L", price: 140 },
      { size: "250ml", price: 45 }
    ],
    benefits: [
      "Supports digestive health",
      "Boosts immunity",
      "Promotes gut health",
      "Natural probiotic cultures"
    ],
    nutrition: {
      calories: 47,
      protein: "8g",
      fat: "7.5g",
      carbs: "15g",
      probiotics: "Multiple live cultures"
    },
    featured: true,
    new: false,
    bestseller: true,
    organic: false,
    glutenFree: true,
    vegan: false,
    lowSugar: true,
    highProtein: true,
    inStock: true,
    stockCount: 100,
    tags: ["probiotic", "vanilla", "gut health", "immunity"],
    ingredients: [
      "Milk",
      "Live probiotic cultures (Lactobacillus acidophilus, Bifidobacterium, Lactobacillus rhamnosus)",
      "Natural vanilla flavoring"
    ],
    allergens: ["Milk"]
  },
  { 
    id: 2, 
    name: "Bogani Strawberry Probiotic Yogurt", 
    type: "Probiotic Yogurt",
    category: "Dairy",
    flavor: "Strawberry",
    image: strawberryBottle,
    colorCode: "#FFE4E1",
    price: 140,
    rating: 4.0,
    reviews: 2,
    description: "A tangy probiotic yogurt with natural strawberry flavor, supporting gut health and immunity.",
    longDescription: "Bogani Strawberry Probiotic Yogurt combines the health benefits of probiotics with a natural strawberry flavor. The tangy taste is unique and leaves no aftertaste, while the texture is thick and satisfying. Perfect for those seeking both health benefits and a fruity treat.",
    sizes: [
      { size: "1L", price: 140 },
      { size: "250ml", price: 45 }
    ],
    benefits: [
      "Supports digestive health",
      "Boosts immunity",
      "Promotes gut health",
      "Natural probiotic cultures"
    ],
    nutrition: {
      calories: 47,
      protein: "8g",
      fat: "7.5g",
      carbs: "15g",
      probiotics: "Multiple live cultures"
    },
    featured: true,
    new: false,
    bestseller: true,
    organic: false,
    glutenFree: true,
    vegan: false,
    lowSugar: true,
    highProtein: true,
    inStock: true,
    stockCount: 100,
    tags: ["probiotic", "strawberry", "gut health", "immunity"],
    ingredients: [
      "Milk",
      "Live probiotic cultures (Lactobacillus acidophilus, Bifidobacterium, Lactobacillus rhamnosus)",
      "Natural strawberry flavoring"
    ],
    allergens: ["Milk"]
  },
  { 
    id: 3, 
    name: "Plain Yogurt", 
    type: "cup",
    category: "probiotic",
    flavor: "plain",
    image: vanillaPlain, 
    colorCode: "#FFFFFF",
    price: 110,
    rating: 4.6,
    reviews: 87,
    description: "Pure and natural probiotic yogurt with no added flavors. Perfect base for your breakfast or cooking needs.",
    sizes: [
      { size: "150ml", price: 110 },
      { size: "500ml", price: 300 },
      { size: "1L", price: 520 }
    ],
    benefits: ["Digestive Health", "Protein Rich", "Versatile Use"],
    nutrition: {
      calories: 90,
      protein: "5.5g",
      fat: "2.5g",
      carbs: "8g",
      probiotics: "1 billion CFU"
    },
    featured: false,
    new: false
  },
  { 
    id: 4, 
    name: "Mango Yogurt", 
    type: "cup",
    category: "probiotic",
    flavor: "mango",
    image: peachBottle, 
    colorCode: "#FFB74D",
    price: 120,
    rating: 4.9,
    reviews: 112,
    description: "Tropical delight with real mango puree blended into our premium probiotic yogurt.",
    sizes: [
      { size: "150ml", price: 120 },
      { size: "500ml", price: 320 },
      { size: "1L", price: 550 }
    ],
    benefits: ["Immunity Boost", "Digestive Health", "Vitamin A & C"],
    nutrition: {
      calories: 125,
      protein: "4.8g",
      fat: "3.0g",
      carbs: "17g",
      probiotics: "1 billion CFU"
    },
    featured: false,
    new: true
  },
  { 
    id: 5, 
    name: "Blueberry Yogurt", 
    type: "cup",
    category: "probiotic",
    flavor: "blueberry",
    image: berryRedCup, 
    colorCode: "#5E35B1",
    price: 130,
    rating: 4.7,
    reviews: 76,
    description: "Antioxidant-rich blueberries combined with our creamy probiotic yogurt for a delicious health boost.",
    sizes: [
      { size: "150ml", price: 130 },
      { size: "500ml", price: 340 },
      { size: "1L", price: 580 }
    ],
    benefits: ["Antioxidants", "Brain Health", "Digestive Health"],
    nutrition: {
      calories: 125,
      protein: "4.5g",
      fat: "3.2g",
      carbs: "16g",
      probiotics: "1 billion CFU"
    },
    featured: false,
    new: true
  },
  { 
    id: 6, 
    name: "Strawberry Family Pack", 
    type: "bottle",
    category: "probiotic",
    flavor: "strawberry",
    image: strawberryBottle, 
    colorCode: "#D50000",
    price: 550,
    rating: 4.9,
    reviews: 64,
    description: "Our popular strawberry yogurt in a convenient family-sized bottle. Perfect for sharing.",
    sizes: [
      { size: "1L", price: 550 },
      { size: "2L", price: 980 }
    ],
    benefits: ["Immunity Boost", "Digestive Health", "Family Value"],
    nutrition: {
      calories: 120,
      protein: "5g",
      fat: "3g",
      carbs: "15g",
      probiotics: "1 billion CFU"
    },
    featured: true,
    new: false
  },
  { 
    id: 7, 
    name: "Vanilla Family Pack", 
    type: "bottle",
    category: "probiotic",
    flavor: "vanilla",
    image: vanillaBottle, 
    colorCode: "#F2EA7E",
    price: 550,
    rating: 4.8,
    reviews: 58,
    description: "Our creamy vanilla yogurt in a larger size for the whole family to enjoy.",
    sizes: [
      { size: "1L", price: 550 },
      { size: "2L", price: 980 }
    ],
    benefits: ["Immunity Boost", "Bone Health", "Family Value"],
    nutrition: {
      calories: 130,
      protein: "4.5g",
      fat: "3.2g",
      carbs: "16g",
      probiotics: "1 billion CFU"
    },
    featured: true,
    new: false
  },
  { 
    id: 8, 
    name: "Greek Yogurt", 
    type: "cup",
    category: "greek",
    flavor: "plain",
    image: "/placeholder.svg", 
    colorCode: "#FAFAFA",
    price: 150,
    rating: 4.8,
    reviews: 42,
    description: "Thick and creamy Greek-style yogurt with high protein content. Perfect for fitness enthusiasts.",
    sizes: [
      { size: "150ml", price: 150 },
      { size: "500ml", price: 380 }
    ],
    benefits: ["High Protein", "Muscle Recovery", "Low Carb"],
    nutrition: {
      calories: 100,
      protein: "10g",
      fat: "2g",
      carbs: "4g",
      probiotics: "1 billion CFU"
    },
    featured: false,
    new: true
  }
];

interface ProductCardProps {
  product: Product;
  inWishlist: boolean;
  toggleWishlist: (productId: number) => void;
  openModal: (product: Product) => void;
  openQuickView: (product: Product) => void;
  index: number;
  addToCart: (product: Product, quantity: number) => void;
  viewMode: 'grid' | 'list';
  theme: 'light' | 'dark';
}

export default function Products(): React.ReactNode {
  // Theme awareness
  const { theme } = useTheme();
  
  // Enhanced state management
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewImageIndex, setQuickViewImageIndex] = useState<number>(0);
  
  // Advanced Filtering
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Enhanced Search
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isVoiceSearch, setIsVoiceSearch] = useState<boolean>(false);
  const [voiceSearchSupported, setVoiceSearchSupported] = useState<boolean>(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("all");

  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);
  
  // Refs
  const filterSectionRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Animations
  const heroControls = useAnimation();
  const filterControls = useAnimation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filtersRef, filtersInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Get all unique categories, types, and flavors for filters
  const categories = ["all", ...Array.from(new Set(productsData.map(p => p.category)))];
  const types = ["all", ...Array.from(new Set(productsData.map(p => p.type)))];
  const flavors = ["all", ...Array.from(new Set(productsData.map(p => p.flavor)))];
  
  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
      
      // Close suggestions when clicking outside
      if (showSuggestions && !(event.target as Element).closest('.search-suggestions')) {
        setShowSuggestions(false);
      }
    };
    
    if (selectedProduct || showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct, showSuggestions]);
  
  // Load animation
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Hero section animation
  useEffect(() => {
    if (heroInView) {
      heroControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      });
    }
  }, [heroInView, heroControls]);
  
  // Filter section animation
  useEffect(() => {
    if (filtersInView) {
      filterControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
      });
    }
  }, [filtersInView, filterControls]);
  
  // Enhanced search with auto-complete
  useEffect(() => {
    if (searchTerm.length > 0) {
      const suggestions = generateSearchSuggestions(searchTerm);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Generate search suggestions
  const generateSearchSuggestions = (query: string): string[] => {
    if (query.length < 2) return [];
    
    const allTerms = [
      ...productsData.map(p => p.name),
      ...productsData.map(p => p.flavor),
      ...productsData.map(p => p.category),
      ...productsData.flatMap(p => p.benefits),
      ...productsData.flatMap(p => p.tags || []),
      "organic", "gluten-free", "vegan", "high-protein", "low-sugar", "probiotic"
    ];
    
    const uniqueTerms = [...new Set(allTerms)];
    return uniqueTerms
      .filter(term => term.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  };

  // Voice search functionality
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSearchSupported(true);
    }
  }, []);

  const startVoiceSearch = () => {
    if (!voiceSearchSupported) return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    setIsVoiceSearch(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsVoiceSearch(false);
    };
    
    recognition.onerror = () => {
      setIsVoiceSearch(false);
    };
    
    recognition.onend = () => {
      setIsVoiceSearch(false);
    };
    
    recognition.start();
  };

  // Enhanced filter products with advanced filtering
  useEffect(() => {
    let filtered = [...productsData];
    let filterCount = 0;
    
    // Enhanced search
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.benefits.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        p.flavor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filterCount++;
      
      // Add to search history
      if (!searchHistory.includes(searchTerm)) {
        setSearchHistory(prev => [searchTerm, ...prev.slice(0, 4)]);
      }
    }
    
    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
      filterCount++;
    }
    
    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(p => p.type === selectedType);
      filterCount++;
    }
    
    // Flavor filter
    if (selectedFlavor !== "all") {
      filtered = filtered.filter(p => p.flavor === selectedFlavor);
      filterCount++;
    }
    
    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (priceRange[0] > 0 || priceRange[1] < 600) {
      filterCount++;
    }
    
    // Dietary filters
    if (selectedDietaryFilters.length > 0) {
      filtered = filtered.filter(p => {
        return selectedDietaryFilters.every(filter => {
          switch (filter) {
            case 'organic': return p.organic;
            case 'gluten-free': return p.glutenFree;
            case 'vegan': return p.vegan;
            case 'low-sugar': return p.lowSugar;
            case 'high-protein': return p.highProtein;
            case 'bestseller': return p.bestseller;
            case 'in-stock': return p.inStock;
            default: return true;
          }
        });
      });
      filterCount++;
    }
    
    setActiveFiltersCount(filterCount);
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedType, selectedFlavor]);
  
  // Wishlist toggle
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        setSuccessMessage("Removed from wishlist");
        setShowSuccessNotification(true);
        setTimeout(() => setShowSuccessNotification(false), 2000);
        return prev.filter(id => id !== productId);
      } else {
        setSuccessMessage("Added to wishlist");
        setShowSuccessNotification(true);
        setTimeout(() => setShowSuccessNotification(false), 2000);
        return [...prev, productId];
      }
    });
  };
  
  // Open modal
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(0);
    setQuantity(1);
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };
  
  // Add to cart
  const addToCart = (product: Product, quantity: number) => {
    setSuccessMessage(`Added ${quantity} ${product.name} to cart`);
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 2000);
    
    if (selectedProduct) {
      closeModal();
    }
  };

  // Quick View functions
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewImageIndex(0);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    setQuickViewImageIndex(0);
  };

  const nextQuickViewImage = () => {
    if (quickViewProduct?.images) {
      setQuickViewImageIndex((prev) => 
        prev === quickViewProduct.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevQuickViewImage = () => {
    if (quickViewProduct?.images) {
      setQuickViewImageIndex((prev) => 
        prev === 0 ? quickViewProduct.images!.length - 1 : prev - 1
      );
    }
  };

  // Advanced filter functions
  const toggleDietaryFilter = (filter: string) => {
    setSelectedDietaryFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedFlavor("all");
  };
  
  // Clear single filter
  const clearFilter = (filterType: string) => {
    switch (filterType) {
      case "search":
        setSearchTerm("");
        break;
      case "category":
        setSelectedCategory("all");
        break;
      case "type":
        setSelectedType("all");
        break;
      case "flavor":
        setSelectedFlavor("all");
        break;
      default:
        break;
    }
  };
  
  // Toggle filter section
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`pt-24 pb-16 px-4 md:px-8 min-h-screen overflow-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-white to-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={heroControls}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className={`relative overflow-hidden rounded-3xl p-12 md:p-16 text-white shadow-xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-red-800 to-green-800'
            : 'bg-gradient-to-r from-primaryRed to-accentGreen'
        }`}>
          {/* Background patterns */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white"></div>
            <svg width="100%" height="100%" className="absolute inset-0">
              <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#diagonalLines)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Discover Our Delicious <br className="hidden md:block" />
                <span className="text-yellow-200">Probiotic Yogurts</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
                Crafted with care for your health and taste buds. Explore our range of premium probiotic yogurts.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="#product-grid" className="inline-block px-8 py-3 bg-white text-primaryRed font-bold rounded-full hover:bg-white/90 transition-colors shadow-md">
                    Shop Now
                  </a>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="#benefits" className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                    Health Benefits
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Floating yogurt cups */}
          <div className="absolute top-12 right-12 hidden lg:block">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              className="absolute right-0 top-0"
            >
              <div 
                className="w-36 h-36 rounded-full"
                style={{ backgroundColor: "#D50000" }}
              >
                <div className="absolute top-0 left-0 right-0 h-6 bg-white rounded-t-full"></div>
                <div className="flex items-center justify-center h-full">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <div 
                      className="w-20 h-20 rounded-full"
                      style={{ backgroundColor: "#D5000040" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 6,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              className="absolute right-40 top-20"
            >
              <div 
                className="w-28 h-28 rounded-full"
                style={{ backgroundColor: "#F2EA7E" }}
              >
                <div className="absolute top-0 left-0 right-0 h-5 bg-white rounded-t-full"></div>
                <div className="flex items-center justify-center h-full">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <div 
                      className="w-16 h-16 rounded-full"
                      style={{ backgroundColor: "#F2EA7E40" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Search and Filter Section */}
      <motion.div
        ref={filtersRef}
        initial={{ opacity: 0, y: 30 }}
        animate={filterControls}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className={`rounded-2xl shadow-lg overflow-hidden transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-gray-100'
        }`}>
          {/* Enhanced Search bar */}
          <div className={`p-6 border-b transition-colors duration-300 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                placeholder="Search for yogurt flavors, benefits, or ingredients..."
                className={`w-full pl-12 pr-20 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-700 placeholder-gray-400'
                }`}
                aria-label="Search products"
                role="searchbox"
              />
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} aria-hidden="true" />
              
              {/* Voice Search Button */}
              {voiceSearchSupported && (
                <button
                  onClick={startVoiceSearch}
                  disabled={isVoiceSearch}
                  className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors mobile-touch-target ${
                    isVoiceSearch 
                      ? theme === 'dark' ? 'bg-red-900 text-red-400' : 'bg-red-100 text-red-600'
                      : theme === 'dark' 
                        ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                  }`}
                  title="Voice Search"
                  aria-label={isVoiceSearch ? "Voice search in progress" : "Start voice search"}
                >
                  {isVoiceSearch ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Mic className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <MicOff className="w-5 h-5" />
                  )}
                </button>
              )}
              
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`search-suggestions absolute top-full left-6 right-6 rounded-xl shadow-lg mt-2 z-50 max-h-60 overflow-y-auto transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion);
                        setShowSuggestions(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors border-b last:border-b-0 flex items-center gap-3 ${
                        theme === 'dark'
                          ? 'hover:bg-gray-700 border-gray-700 text-gray-200'
                          : 'hover:bg-gray-50 border-gray-100 text-gray-700'
                      }`}
                    >
                      <Search className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                      <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{suggestion}</span>
                    </button>
                  ))}
                  
                  {/* Search History */}
                  {searchHistory.length > 0 && (
                    <>
                      <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-400' 
                          : 'bg-gray-50 text-gray-500'
                      }`}>
                        Recent Searches
                      </div>
                      {searchHistory.slice(0, 3).map((term, index) => (
                        <button
                          key={`history-${index}`}
                          onClick={() => {
                            setSearchTerm(term);
                            setShowSuggestions(false);
                          }}
                          className={`w-full text-left px-4 py-3 transition-colors border-b last:border-b-0 flex items-center gap-3 ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700 border-gray-700'
                              : 'hover:bg-gray-50 border-gray-100'
                          }`}
                        >
                          <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{term}</span>
                        </button>
                      ))}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Filter toggle and active filters */}
          <div className={`px-6 py-4 flex flex-wrap items-center gap-3 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <button
              onClick={toggleFilters}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors mobile-touch-target ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <Filter size={18} />
              <span>Filters</span>
              <span className={`flex items-center justify-center w-5 h-5 text-xs rounded-full ${activeFiltersCount > 0 ? 'bg-primaryRed text-white' : 'bg-gray-200 text-gray-600'}`}>
                {activeFiltersCount}
              </span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors mobile-touch-target ${
                theme === 'dark'
                  ? 'bg-blue-900 text-blue-300 hover:bg-blue-800'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
              aria-expanded={showAdvancedFilters}
              aria-controls="advanced-filter-panel"
            >
              <SlidersHorizontal size={18} />
              <span>Advanced</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${showAdvancedFilters ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {/* View Mode Toggle */}
            <div className={`flex items-center rounded-lg p-1 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`} role="tablist" aria-label="View mode selection">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors mobile-touch-target ${
                  viewMode === 'grid' 
                    ? theme === 'dark'
                      ? 'bg-gray-600 text-primaryRed shadow-sm' 
                      : 'bg-white text-primaryRed shadow-sm'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
                role="tab"
                aria-selected={viewMode === 'grid'}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors mobile-touch-target ${
                  viewMode === 'list' 
                    ? theme === 'dark'
                      ? 'bg-gray-600 text-primaryRed shadow-sm' 
                      : 'bg-white text-primaryRed shadow-sm'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
                role="tab"
                aria-selected={viewMode === 'list'}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
            

            
            {/* Active filters display */}
            {(selectedCategory !== "all" || selectedType !== "all" || selectedFlavor !== "all" || searchTerm) && (
              <div className="flex flex-wrap items-center gap-2 ml-auto">
                {selectedCategory !== "all" && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-primaryRed/10 text-primaryRed text-sm rounded-full">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => clearFilter("category")}>
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {selectedType !== "all" && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-primaryRed/10 text-primaryRed text-sm rounded-full">
                    <span>Type: {selectedType}</span>
                    <button onClick={() => clearFilter("type")}>
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {selectedFlavor !== "all" && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-primaryRed/10 text-primaryRed text-sm rounded-full">
                    <span>Flavor: {selectedFlavor}</span>
                    <button onClick={() => clearFilter("flavor")}>
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {searchTerm && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-primaryRed/10 text-primaryRed text-sm rounded-full">
                    <span>Search: "{searchTerm}"</span>
                    <button onClick={() => clearFilter("search")}>
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                <button
                  onClick={resetFilters}
                  className="px-3 py-1 border border-gray-200 text-gray-600 text-sm rounded-full hover:bg-gray-100 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
          
          {/* Filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                ref={filterSectionRef}
              >
                <div className="px-6 py-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category 
                              ? 'bg-primaryRed text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="capitalize">{category}</span>
                          {selectedCategory === category && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Type Filter */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Type</h3>
                    <div className="space-y-2">
                      {types.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                            selectedType === type 
                              ? 'bg-primaryRed text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="capitalize">{type}</span>
                          {selectedType === type && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Flavor Filter */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Flavor</h3>
                    <div className="space-y-2">
                      {flavors.map((flavor) => (
                        <button
                          key={flavor}
                          onClick={() => setSelectedFlavor(flavor)}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                            selectedFlavor === flavor 
                              ? 'bg-primaryRed text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="capitalize">{flavor}</span>
                          {selectedFlavor === flavor && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-100"
              >
                <div className={`px-6 py-6 transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20'
                    : 'bg-gradient-to-r from-blue-50 to-purple-50'
                }`} id="advanced-filter-panel">
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <SlidersHorizontal className="w-5 h-5" />
                    Advanced Filters
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Price Range Slider */}
                    <div className="space-y-3">
                      <label className={`block text-sm font-medium transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Price Range (KES)
                      </label>
                      <div className="px-3">
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="600"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                          />
                          <input
                            type="range"
                            min="0"
                            max="600"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                          />
                        </div>
                        <div className={`flex justify-between text-sm mt-2 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <span>KES {priceRange[0]}</span>
                          <span>KES {priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dietary Preferences */}
                    <div className="space-y-3">
                      <label className={`block text-sm font-medium transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Dietary Preferences
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: 'organic', label: 'Organic', icon: Leaf },
                          { key: 'gluten-free', label: 'Gluten Free', icon: Shield },
                          { key: 'vegan', label: 'Vegan', icon: Sparkles },
                          { key: 'low-sugar', label: 'Low Sugar', icon: Droplets },
                          { key: 'high-protein', label: 'High Protein', icon: Zap },
                          { key: 'bestseller', label: 'Bestseller', icon: Award }
                        ].map(({ key, label, icon: Icon }) => (
                          <button
                            key={key}
                            onClick={() => toggleDietaryFilter(key)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors mobile-touch-target ${
                              selectedDietaryFilters.includes(key)
                                ? 'bg-primaryRed text-white'
                                : theme === 'dark'
                                  ? 'bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600'
                                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Stock Status */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Availability
                      </label>
                      <div className="space-y-2">
                        <button
                          onClick={() => toggleDietaryFilter('in-stock')}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedDietaryFilters.includes('in-stock')
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>In Stock Only</span>
                          </div>
                          {selectedDietaryFilters.includes('in-stock') && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Filter Actions */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {filteredProducts.length} products found
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setPriceRange([0, 600]);
                          setSelectedDietaryFilters([]);
                        }}
                        className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Clear Advanced
                      </button>
                      <button
                        onClick={() => setShowAdvancedFilters(false)}
                        className="px-4 py-2 text-sm bg-primaryRed text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          // Skeleton loading state
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-10 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-[380px] rounded-xl bg-white shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : filteredProducts.length === 0 ? (
          // Empty state
          <div className="py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-6">
                <Search size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No products found</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                We couldn't find any products that match your current filters. Try adjusting your search or filters.
              </p>
              <button 
                onClick={resetFilters}
                className="inline-flex items-center px-6 py-3 bg-primaryRed text-white font-semibold rounded-lg hover:bg-primaryRed/90 transition-colors"
              >
                <X size={18} className="mr-2" />
                Clear all filters
              </button>
            </motion.div>
          </div>
        ) : (
          // Products grid
          <motion.div
            id="product-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                inWishlist={wishlist.includes(product.id)}
                toggleWishlist={toggleWishlist}
                openModal={openModal}
                openQuickView={openQuickView}
                index={index}
                addToCart={addToCart}
                viewMode={viewMode}
                theme={theme}
              />
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Benefits Section */}
      <div id="benefits" className="max-w-7xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Health Benefits</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our probiotic yogurts are packed with beneficial bacteria that support your health in numerous ways.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Gut Health", description: "Supports digestive balance and improves nutrient absorption", icon: <Droplets size={24} className="text-primaryRed" /> },
              { title: "Immune Support", description: "Strengthens your natural defenses against illnesses", icon: <Sparkles size={24} className="text-accentGreen" /> },
              { title: "Natural Ingredients", description: "Made with fresh milk and real fruit with no artificial additives", icon: <Leaf size={24} className="text-primaryRed" /> }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-xl shadow-md p-6 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
              
              {/* Product Image */}
              <div 
                className="md:w-1/2 p-8 relative"
                style={{ backgroundColor: `${selectedProduct.colorCode}15` }}
              >
                <div className="flex items-center justify-center h-full">
                  <motion.div
                    animate={{ 
                      rotate: [0, 2, 0, -2, 0],
                      scale: [1, 1.02, 1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <div 
                      className="w-64 h-64 rounded-full relative overflow-hidden"
                      style={{ backgroundColor: selectedProduct.colorCode }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-8 bg-white rounded-t-full"></div>
                      <div className="flex items-center justify-center h-full pt-4">
                        <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center">
                          <div 
                            className="w-36 h-36 rounded-full"
                            style={{ 
                              backgroundColor: `${selectedProduct.colorCode}40`,
                              backgroundImage: `url(${selectedProduct.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Product badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {selectedProduct.new && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-accentGreen text-white text-xs font-semibold rounded-full inline-flex items-center"
                    >
                      <Sparkles size={12} className="mr-1" />
                      NEW
                    </motion.span>
                  )}
                  {selectedProduct.featured && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="px-3 py-1 bg-primaryRed text-white text-xs font-semibold rounded-full"
                    >
                      FEATURED
                    </motion.span>
                  )}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto max-h-[90vh] md:max-h-none">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star 
                          key={index} 
                          size={16} 
                          className={index < Math.floor(selectedProduct.rating) ? "text-yellow-400" : "text-gray-300"}
                          fill={index < Math.floor(selectedProduct.rating) ? "#FBBF24" : "#D1D5DB"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {selectedProduct.description}
                  </p>
                  
                  {/* Size Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(idx)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedSize === idx
                              ? 'bg-primaryRed text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {size.size} - KSh {size.price.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
                    <div className="flex items-center">
                      <button
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        className={`w-10 h-10 rounded-l-lg flex items-center justify-center ${
                          quantity > 1 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-200">
                        {quantity}
                      </div>
                      <button
                        onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                        className={`w-10 h-10 rounded-r-lg flex items-center justify-center ${
                          quantity < 10 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={quantity >= 10}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.benefits.map((benefit, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center px-3 py-1 bg-accentGreen/10 text-accentGreen text-xs font-medium rounded-full"
                        >
                          <Info size={12} className="mr-1" />
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Nutrition Information */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Nutrition Information (per 100ml)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500 text-xs">Calories</span>
                        <span className="font-medium">{selectedProduct.nutrition.calories}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500 text-xs">Protein</span>
                        <span className="font-medium">{selectedProduct.nutrition.protein}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500 text-xs">Fat</span>
                        <span className="font-medium">{selectedProduct.nutrition.fat}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500 text-xs">Carbs</span>
                        <span className="font-medium">{selectedProduct.nutrition.carbs}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded sm:col-span-2">
                        <span className="block text-gray-500 text-xs">Probiotics</span>
                        <span className="font-medium">{selectedProduct.nutrition.probiotics}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 items-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(
                        selectedProduct, 
                        quantity
                      )}
                      className="flex-grow flex items-center justify-center px-6 py-3 bg-primaryRed text-white font-bold rounded-xl hover:bg-primaryRed/90 transition-colors shadow-sm"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart - KSh {(selectedProduct.sizes[selectedSize].price * quantity).toLocaleString()}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(selectedProduct.id);
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        wishlist.includes(selectedProduct.id) ? 'bg-primaryRed/10' : 'bg-gray-100'
                      }`}
                    >
                      <Heart 
                        size={20} 
                        className={wishlist.includes(selectedProduct.id) ? "text-primaryRed" : "text-gray-500"} 
                        fill={wishlist.includes(selectedProduct.id) ? "#D50000" : "none"} 
                      />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      <Share2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4"
            onClick={closeQuickView}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="flex flex-col md:flex-row">
                {/* Product Images */}
                <div className="md:w-1/2 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="relative">
                    {/* Main Image */}
                    <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-sm">
                      <img
                        src={quickViewProduct.images?.[quickViewImageIndex] || quickViewProduct.image}
                        alt={quickViewProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Image Navigation */}
                    {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={prevQuickViewImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <button
                          onClick={nextQuickViewImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <ArrowRight size={16} />
                        </button>
                        
                        {/* Image Indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {quickViewProduct.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setQuickViewImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === quickViewImageIndex ? 'bg-primaryRed' : 'bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    
                    {/* Product Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {quickViewProduct.bestseller && (
                        <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Award size={10} />
                          Bestseller
                        </span>
                      )}
                      {quickViewProduct.organic && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Leaf size={10} />
                          Organic
                        </span>
                      )}
                      {quickViewProduct.new && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="md:w-1/2 p-6 flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{quickViewProduct.name}</h2>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index} 
                            size={14} 
                            className={index < Math.floor(quickViewProduct.rating) ? "text-yellow-400" : "text-gray-300"}
                            fill={index < Math.floor(quickViewProduct.rating) ? "#FBBF24" : "#D1D5DB"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {quickViewProduct.rating} ({quickViewProduct.reviews} reviews)
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primaryRed">
                          KES {quickViewProduct.price.toLocaleString()}
                        </span>
                        {quickViewProduct.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            KES {quickViewProduct.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {quickViewProduct.inStock && quickViewProduct.stockCount && (
                        <p className="text-sm text-green-600 mt-1">
                          {quickViewProduct.stockCount} in stock
                        </p>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {quickViewProduct.longDescription || quickViewProduct.description}
                    </p>
                    
                    {/* Benefits */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.benefits.slice(0, 3).map((benefit, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Dietary Info */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.glutenFree && (
                          <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full flex items-center gap-1">
                            <Shield size={10} />
                            Gluten-Free
                          </span>
                        )}
                        {quickViewProduct.vegan && (
                          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full flex items-center gap-1">
                            <Sparkles size={10} />
                            Vegan
                          </span>
                        )}
                        {quickViewProduct.highProtein && (
                          <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full flex items-center gap-1">
                            <Zap size={10} />
                            High Protein
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, 1);
                        closeQuickView();
                      }}
                      className="flex-1 px-4 py-3 bg-primaryRed text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        closeQuickView();
                        openModal(quickViewProduct);
                      }}
                      className="px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Info size={16} />
                      Full Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(quickViewProduct.id);
                      }}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        wishlist.includes(quickViewProduct.id)
                          ? 'bg-red-50 text-primaryRed border border-red-200'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart 
                        size={16} 
                        fill={wishlist.includes(quickViewProduct.id) ? "#D50000" : "none"} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccessNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 flex items-center z-50"
          >
            <div className="w-10 h-10 rounded-full bg-accentGreen flex items-center justify-center mr-3">
              <Check size={20} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{successMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Product Card Component with 3D Flip Effect
function ProductCard({ product, inWishlist, toggleWishlist, openModal, openQuickView, index, addToCart, viewMode, theme }: ProductCardProps): React.ReactNode {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Use motion values for parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform motion values for subtle parallax
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to card center
    const xValue = e.clientX - rect.left - width / 2;
    const yValue = e.clientY - rect.top - height / 2;
    
    // Update motion values with damping
    x.set(xValue / 4);
    y.set(yValue / 4);
  };
  
  // Reset parallax on mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Animate back to center
    x.set(0);
    y.set(0);
  };

  // Mobile optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (viewMode === 'list') {
    // List view for mobile and desktop
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={`rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
            : 'bg-white hover:shadow-lg'
        }`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Product Image */}
          <div className="sm:w-48 h-48 sm:h-auto flex items-center justify-center p-4" style={{ backgroundColor: `${product.colorCode}25` }}>
            <div className="w-32 h-32 rounded-full relative overflow-hidden" style={{ backgroundColor: product.colorCode }}>
              <div className="absolute top-0 left-0 right-0 h-4 bg-white rounded-t-full"></div>
              <div className="flex items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <div 
                    className="w-16 h-16 rounded-full"
                    style={{ 
                      backgroundColor: `${product.colorCode}40`,
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                }`}>{product.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                    inWishlist 
                      ? 'text-primaryRed' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <Heart size={16} fill={inWishlist ? "#D50000" : "none"} />
                </button>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center text-amber-400 mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#FFC107" : "#E5E7EB"} />
                  ))}
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{product.rating} ({product.reviews})</span>
              </div>
              
              <p className={`text-sm mb-3 line-clamp-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>{product.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primaryRed">KES {product.price.toLocaleString()}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors mobile-touch-target ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Quick View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    className="px-3 py-1 bg-primaryRed text-white rounded-lg text-sm hover:bg-red-600 transition-colors mobile-touch-target"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`${isMobile ? 'mobile-card h-auto min-h-[320px]' : 'h-[380px]'} perspective-1000 group`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      <motion.div
        style={{ 
          rotateX: flipped ? 0 : rotateX, 
          rotateY: flipped ? 180 : rotateY,
          transition: "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
        className={`relative w-full h-full cursor-pointer ${isMobile ? '' : 'transform-style-3d'} ${flipped && !isMobile ? 'rotate-y-180' : ''}`}
        onClick={() => !isMobile && setFlipped(!flipped)}
      >
        {/* Front Side */}
        <div
          className={`absolute w-full h-full rounded-xl overflow-hidden backface-hidden transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white'
          }`}
          style={{
            boxShadow: isHovered && !flipped 
              ? theme === 'dark' 
                ? "0 15px 30px rgba(0, 0, 0, 0.3)" 
                : "0 15px 30px rgba(0, 0, 0, 0.1)"
              : theme === 'dark'
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Product Image */}
          <div
            className="h-48 flex items-center justify-center p-4 transition-colors duration-300"
            style={{ backgroundColor: `${product.colorCode}25` }}
          >
            <motion.div
              animate={isHovered && !flipped ? { 
                y: [-5, 5, -5],
                rotate: [-2, 2, -2]
              } : {}}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div
                className="w-36 h-36 rounded-full relative overflow-hidden"
                style={{ backgroundColor: product.colorCode }}
              >
                <div className="absolute top-0 left-0 right-0 h-6 bg-white rounded-t-full"></div>
                <div className="flex items-center justify-center h-full">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <div 
                      className="w-20 h-20 rounded-full"
                      style={{ 
                        backgroundColor: `${product.colorCode}40`,
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Product badges */}
            <div className="absolute top-2 left-2">
              {product.new && (
                <span className="inline-block px-2 py-1 bg-accentGreen text-white text-xs rounded-full mb-1">
                  New
                </span>
              )}
              {product.featured && (
                <span className="inline-block px-2 py-1 bg-primaryRed text-white text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h2 className={`text-lg font-semibold transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>{product.name}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                  inWishlist 
                    ? 'text-primaryRed' 
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <Heart 
                  size={16} 
                  fill={inWishlist ? "#D50000" : "none"} 
                  className="transition-transform duration-300 hover:scale-110" 
                />
              </button>
            </div>
            
            <div className="flex items-center mt-1 mb-2">
              <div className="flex items-center text-amber-400 mr-1">
                <Star size={12} fill="#FFC107" />
              </div>
              <span className={`text-xs transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {product.rating} ({product.reviews})
              </span>
            </div>

            <p className="text-primaryRed font-bold">KSh {product.price.toLocaleString()}</p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {product.flavor !== 'plain' && (
                  <span className={`px-2 py-1 text-xs rounded-full capitalize transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.flavor}
                  </span>
                )}
              </div>
            </div>

            <div className={`flex items-center text-xs mt-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className={`w-full h-0.5 rounded overflow-hidden transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isHovered && !flipped ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1 }}
                  className="h-full bg-accentGreen" 
                ></motion.div>
              </div>
              <span className="whitespace-nowrap ml-2">Tap to flip</span>
            </div>
          </div>
          
          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            animate={isHovered && !flipped || isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gradient-to-t from-gray-800 via-gray-800 to-transparent' 
                : 'bg-gradient-to-t from-white via-white to-transparent'
            }`}
          >
            <div className="flex gap-2">
                              <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openQuickView(product);
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center mobile-touch-target ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Eye size={14} className="mr-1" />
                  Quick View
                </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="flex-1 px-3 py-2 bg-primaryRed text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={14} className="mr-1" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Back Side with Details */}
        <div
          className={`absolute w-full h-full rounded-xl p-5 flex flex-col backface-hidden rotate-y-180 overflow-hidden transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white'
          }`}
          style={{
            boxShadow: isHovered && flipped 
              ? theme === 'dark' 
                ? "0 15px 30px rgba(0, 0, 0, 0.3)" 
                : "0 15px 30px rgba(0, 0, 0, 0.1)"
              : theme === 'dark'
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h2 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>{product.name}</h2>
          <p className={`text-sm flex-grow transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>{product.description}</p>
          
          <div className="mt-3 mb-1">
            <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Benefits:</h3>
            <div className="flex flex-wrap gap-1">
              {product.benefits.map((benefit, idx) => (
                <span key={idx} className="px-2 py-1 bg-accentGreen/10 text-accentGreen text-xs rounded-full flex items-center">
                  <Info size={10} className="mr-1" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-3 mb-3">
            <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Available sizes:</h3>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size, idx) => (
                <span key={idx} className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-200' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {size.size} - KSh {size.price.toLocaleString()}
                </span>
              ))}
            </div>
          </div>
          
          <div className={`flex items-center text-xs mb-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className={`w-full h-0.5 rounded overflow-hidden transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <motion.div 
                initial={{ width: 0 }}
                animate={isHovered && flipped ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1 }}
                className="h-full bg-accentGreen" 
              ></motion.div>
            </div>
            <span className="whitespace-nowrap ml-2">Tap to flip</span>
          </div>
          
          <div className="mt-auto pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal(product);
              }}
              className="w-full px-4 py-2 bg-primaryRed text-white text-sm font-semibold rounded-lg hover:bg-primaryRed/90 transition-all shadow-sm flex items-center justify-center mobile-touch-target"
            >
              View Details
              <ArrowUpRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  );
}