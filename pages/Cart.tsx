import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  RefreshCw, 
  CreditCard, 
  Shield, 
  Info,
  Truck,
  Camera,
  RotateCw,
  Heart as HeartIcon,
  Check,
  Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { LazyImage } from '../components/ui';
import { useCart } from '../context/CartContext';

// Dynamically import heavy 3D components only when needed
const ProductScene3D = lazy(() => import('../components/spatial/ProductScene3D'));
const GlassmorphicLoader = lazy(() => import('../components/spatial/GlassmorphicLoader'));
const ParticleBurst3D = lazy(() => import('../components/spatial/ParticleBurst3D'));

interface BiosphereParticlesProps {
  count?: number;
  className?: string;
  color?: string;
}

const BiosphereParticles: React.FC<BiosphereParticlesProps> = ({ count = 10, className = "", color = "white" }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2, // Smaller particles for mobile
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 6 + 3, // Slightly faster for mobile
      delay: Math.random() * 2,
      xMovement: Math.random() * 20 - 10,
      yMovement: Math.random() * 20 - 10,
    }));
  }, [count]);
  
  return (
    <div className={`biosphere-particles relative w-full h-full ${className}`} aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size + 'px',
            height: particle.size + 'px',
            left: particle.left,
            top: particle.top,
            backgroundColor: color === "white" ? "rgba(255, 255, 255, 0.3)" : `${color}30`
          }}
          animate={{
            x: [0, particle.xMovement, 0],
            y: [0, particle.yMovement, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  color: string;
  size?: string;
  flavor?: string;
  tags?: string[];
  stock?: number;
  description?: string;
  model3D?: string;
}

interface RecommendationItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedDays: string;
  icon: React.ReactNode;
}

const initialItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Probiotic Yogurt',
    price: 120.00,
    originalPrice: 150.00,
    quantity: 2,
    image: '/src/assets/brand yorughut.jpg',
    color: '#D50000',
    flavor: 'Original',
    tags: ['Organic', 'Probiotic'],
    stock: 10,
    description: 'Premium grade probiotic yogurt with live cultures to support gut health.',
    model3D: '/models/yogurt.glb',
  },
  {
    id: '2',
    name: 'Vanilla Bean Flavor',
    price: 130.00,
    quantity: 1,
    image: '/src/assets/vanilla.jpg',
    color: '#F2EA7E',
    flavor: 'Vanilla Bean',
    tags: ['Limited Edition', 'Natural'],
    stock: 5,
    description: 'Infused with real vanilla bean for a rich and authentic flavor profile.',
    model3D: '/models/yogurt-vanilla.glb',
  }
];

const recommendedProducts: RecommendationItem[] = [
  {
    id: '3',
    name: 'Bogani Berry Bliss',
    price: 130.00,
    image: '/src/assets/berry red cup image.jpg',
    category: 'Yogurt',
    badge: 'New'
  },
  {
    id: '4',
    name: 'Bogani Health Supplement Pack',
    price: 1800.00,
    image: '/src/assets/bogani big all bottles picture with flavours.jpg',
    category: 'Supplements'
  },
  {
    id: '5',
    name: 'Coconut Flavor',
    price: 140.00,
    image: '/src/assets/coconut.jpg',
    category: 'Flavors',
    badge: 'Popular'
  }
];

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    price: 150.00,
    description: 'Regular shipping to your doorstep',
    estimatedDays: '3-5 business days',
    icon: <Truck className="w-5 h-5" />
  },
  {
    id: 'express',
    name: 'Express Delivery',
    price: 300.00,
    description: 'Faster shipping option',
    estimatedDays: '1-2 business days',
    icon: <Truck className="w-5 h-5" />
  }
];

const validPromoCodes: Record<string, number> = {
  'WELCOME10': 10,
  'SUMMER25': 25
};

// All 3D components have been moved to ProductScene3D.tsx

// Optimized Cart Item Component
const CartItemComponent = ({ 
  item, 
  isRemoving, 
  onQuantityChange, 
  onRemove, 
  onSaveForLater,
  isActive,
  onSelect,
  loadingState,
  className = ""
}: {
  item: CartItem;
  isRemoving: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
  isActive: boolean;
  onSelect: (id: string) => void;
  loadingState: string | null;
  className?: string;
}) => {
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && (!item.stock || newQuantity <= item.stock)) {
      setLocalQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };
  
  const isLoading = loadingState === item.id;
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
      className={`relative flex flex-col md:flex-row items-center gap-4 p-4 md:p-6 rounded-2xl transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg cursor-pointer border
        ${isActive ? 'border-yogurt-red ring-2 ring-yogurt-red bg-white dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}
        ${isRemoving ? 'opacity-50 scale-95' : ''}
        ${className}`}
      onClick={() => onSelect(item.id)}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center rounded-2xl z-10">
          <RefreshCw className="w-8 h-8 text-yogurt-red animate-spin" />
        </div>
      )}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-inner">
        <LazyImage
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
          placeholderColor="#f3f4f6"
        />
        {item.model3D && (
          <button 
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onSelect(item.id); }}
            className="absolute bottom-1 right-1 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
            aria-label="View 3D model"
          >
            <Camera size={16} />
          </button>
        )}
      </div>
        
      <div className="flex-grow text-center md:text-left">
        <h3 className={`font-display text-lg md:text-xl font-semibold mb-1 ${isActive ? 'text-yogurt-red' : 'text-gray-800 dark:text-white'}`}>{item.name}</h3>
        {item.flavor && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Flavor: {item.flavor}</p>}
        <div className="flex flex-wrap gap-1.5 my-2 justify-center md:justify-start">
          {item.tags?.map((tag: string) => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <p className={`font-sans text-base md:text-lg font-semibold ${isActive ? 'text-yogurt-red' : 'text-gray-900 dark:text-white'}`}>
          KES {(item.price * item.quantity).toFixed(2)}
          {item.originalPrice && <span className="text-xs text-gray-400 dark:text-gray-500 line-through ml-2">KES {(item.originalPrice * item.quantity).toFixed(2)}</span>}
        </p>
      </div>
            
      <div className="flex flex-col items-center md:items-end gap-3 md:ml-auto">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={(e: React.MouseEvent) => {e.stopPropagation(); handleQuantityChange(localQuantity - 1);}}
            disabled={localQuantity <= 1 || isLoading}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} className="text-gray-700 dark:text-gray-300" />
          </motion.button>
          <span className="w-8 text-center font-medium text-gray-800 dark:text-white">{localQuantity}</span>
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={(e: React.MouseEvent) => {e.stopPropagation(); handleQuantityChange(localQuantity + 1);}}
            disabled={isLoading || (item.stock ? localQuantity >= item.stock : false)}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} className="text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>
        {item.stock && item.stock < 10 && <p className="text-xs text-red-500">Only {item.stock} left!</p>}

        <div className="flex gap-2 mt-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onSaveForLater(item.id); }}
            className="text-xs text-gray-500 hover:text-yogurt-red dark:text-gray-400 dark:hover:text-accent-green p-1 transition-colors disabled:opacity-50"
            disabled={isLoading}
            aria-label="Save for later"
          >
            Save for Later
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onRemove(item.id); }}
            className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 transition-colors disabled:opacity-50"
            disabled={isLoading}
            aria-label="Remove item"
          >
            <Trash2 size={14} className="inline mr-1" /> Remove
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Recommendation Card Component with optimized rendering
const RecommendationCard = ({ 
  product, 
  onAddToCart 
}: {
  product: RecommendationItem;
  onAddToCart: (productId: string) => void;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <motion.div 
      ref={ref}
      className="relative rounded-xl overflow-hidden shadow-lg group bg-white dark:bg-gray-800 border border-transparent hover:border-yogurt-red dark:hover:border-accent-green transition-all duration-300 transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <LazyImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          placeholderColor="#f3f4f6"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${product.badge === 'New' ? 'bg-accent-green text-white' : 'bg-yogurt-red text-white'}`}>
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product.id)}
            className="w-full text-sm bg-white dark:bg-gray-900 text-yogurt-red dark:text-accent-green font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-100"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-display text-md font-semibold text-gray-800 dark:text-white mb-1 truncate">{product.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
        <p className="font-sans text-lg font-bold text-yogurt-red dark:text-accent-green">KES {product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

// Lock Icon Component
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

// Enhanced Cart Component
export default function Cart() {
  // Device detection for conditional rendering
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // State
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, string | null>>({});
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string>(deliveryOptions[0].id);
  const [show3DView, setShow3DView] = useState(!isMobile);

  // Refs & Observers
  const { ref: listRef } = useInView({ threshold: 0.1 });
  const { ref: summaryRef, inView: summaryInView } = useInView({ threshold: 0.5, triggerOnce: true });

  // Item management functions (using context where possible)
  const { updateQuantity: contextUpdateQuantity, removeFromCart } = useCart();
  
  // Item management functions
  const updateQuantity = (id: string, newQuantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleRemoveRequest = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: 'removing' }));
    setRemovingIds(prev => [...prev, id]);
    
    setTimeout(() => {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      setRemovingIds(prev => prev.filter(itemId => itemId !== id));
      setLoadingStates(prev => ({ ...prev, [id]: null }));
      if (activeItemId === id) setActiveItemId(null);
    }, 700);
  };
  
  const saveForLater = (id: string) => {
    const itemToSave = items.find(item => item.id === id);
    if (itemToSave) {
      setLoadingStates(prev => ({ ...prev, [id]: 'saving' }));
      setRemovingIds(prev => [...prev, id]);
      
      setTimeout(() => {
        setSavedForLater(prev => [...prev, { ...itemToSave, quantity: 1 }]);
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        setRemovingIds(prev => prev.filter(itemId => itemId !== id));
        setLoadingStates(prev => ({ ...prev, [id]: null }));
        if (activeItemId === id) setActiveItemId(null);
      }, 700);
    }
  };

  const moveToCart = (id: string) => {
    const itemToMove = savedForLater.find(item => item.id === id);
    if (itemToMove) {
      setSavedForLater(prev => prev.filter(item => item.id !== id));
      setItems(prevItems => {
        const existingItem = prevItems.find(pi => pi.id === id);
        if (existingItem) {
          return prevItems.map(pi => pi.id === id ? { ...pi, quantity: pi.quantity + itemToMove.quantity } : pi);
        }
        return [...prevItems, itemToMove];
      });
    }
  };

  const handleItemClick = (id: string) => {
    setActiveItemId(prevId => prevId === id ? null : id);
  };
  
  const addToCart = (productId: string) => {
    const productToAdd = recommendedProducts.find(p => p.id === productId);
    if (productToAdd) {
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.name === productToAdd.name);
        if (existingItem) {
          return prevItems.map(item => 
            item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [
            ...prevItems, 
            {
              id: productToAdd.id,
              name: productToAdd.name,
              price: productToAdd.price,
              quantity: 1,
              image: productToAdd.image,
              color: '#CCCCCC',
              tags: [productToAdd.category]
            }
          ];
        }
      });
    }
  };

  // Promo code handling
  const applyPromoCode = () => {
    if (validPromoCodes[promoCode]) {
      setDiscount(validPromoCodes[promoCode]);
      setPromoError(null);
    } else {
      setDiscount(0);
      setPromoError("Invalid promo code");
    }
  };
  
  const removePromo = () => {
    setPromoCode("");
    setDiscount(0);
    setPromoError(null);
  };

  // Computed values
  const getSelectedDeliveryOption = useMemo(() => {
    return deliveryOptions.find(opt => opt.id === selectedDelivery) || deliveryOptions[0];
  }, [selectedDelivery]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);
  
  const discountAmount = useMemo(() => {
    return (subtotal * discount) / 100;
  }, [subtotal, discount]);
  
  const deliveryCost = useMemo(() => {
    return getSelectedDeliveryOption.price;
  }, [getSelectedDeliveryOption]);
  
  const total = useMemo(() => {
    return subtotal - discountAmount + deliveryCost;
  }, [subtotal, discountAmount, deliveryCost]);

  const handleCheckout = () => {
    console.log("Proceeding to checkout with total:", total, "Items:", items);
  };
  
  const toggleView = () => {
    if (!isMobile) {
      setShow3DView(!show3DView);
      setActiveItemId(null);
    }
  };

  // Loading state
  if (!items) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <GlassmorphicLoader text="Loading your exquisite selections..." />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-100 pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <ShoppingBag size={36} className="text-yogurt-red dark:text-accent-green" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Your Cart</h1>
          </div>
          <div className="flex items-center gap-4">
            {!isMobile && (
              <button
                onClick={toggleView}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {show3DView ? <Info size={18} /> : <RotateCw size={18} />}
                {show3DView ? 'List View' : '3D View'}
              </button>
            )}
            <Link to="/products" className="text-sm text-yogurt-red dark:text-accent-green hover:underline font-medium flex items-center">
              Continue Shopping <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>

        {/* Empty Cart State */}
        {items.length === 0 && savedForLater.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <ShoppingBag size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-yogurt-red text-white font-semibold rounded-lg shadow-md hover:bg-red-700 dark:bg-accent-green dark:hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content - Left Side */}
            <div ref={listRef} className="lg:col-span-2 space-y-6">
              {/* 3D View / List View - Conditionally render based on device */}
              {!isMobile && show3DView ? (
                <motion.div
                  className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-600"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loader className="w-8 h-8 text-yogurt-red animate-spin" /></div>}>
                    <ProductScene3D 
                      items={items} 
                      activeItemId={activeItemId} 
                      onItemClick={handleItemClick} 
                      removingIds={removingIds} 
                    />
                  </Suspense>
                  
                  {items.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <ShoppingBag size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Your cart is currently empty.</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add some products to see them here!</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <CartItemComponent 
                      key={item.id}
                      item={item}
                      isActive={item.id === activeItemId}
                      onSelect={handleItemClick}
                      onQuantityChange={updateQuantity}
                      onRemove={handleRemoveRequest}
                      onSaveForLater={saveForLater}
                      isRemoving={removingIds.includes(item.id)}
                      loadingState={loadingStates[item.id] || null}
                    />
                  ))}
                </AnimatePresence>
              )}

              {/* Saved For Later Section */}
              {savedForLater.length > 0 && (
                <motion.div 
                  className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200 flex items-center">
                    <HeartIcon size={24} className="mr-3 text-gray-400 dark:text-gray-500" /> 
                    Saved for Later ({savedForLater.length})
                  </h2>
                  <div className="space-y-4">
                    {savedForLater.map(item => (
                      <motion.div 
                        key={item.id} 
                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">{item.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">KES {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => moveToCart(item.id)}
                            className="text-sm text-yogurt-red dark:text-accent-green hover:underline font-medium flex items-center gap-1"
                            aria-label={`Move ${item.name} to cart`}
                          >
                            <span>Move to Cart</span>
                            <ArrowRight size={14} />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSavedForLater(prev => prev.filter(i => i.id !== item.id))}
                            className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-gray-100 dark:bg-gray-700 rounded-full"
                            aria-label={`Remove ${item.name} from saved for later`}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Order Summary - Right Side */}
            <motion.div 
              ref={summaryRef}
              className="lg:col-span-1 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={summaryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h2 className="font-display text-2xl font-semibold mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">Order Summary</h2>
                
                {/* Order Details */}
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-medium text-gray-800 dark:text-white">KES {subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount ({discount}%)</span>
                      <span>-KES {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-medium text-gray-800 dark:text-white">KES {deliveryCost.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mb-6">
                  <label htmlFor="delivery" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Delivery Options</label>
                  <div className="relative">
                    <select 
                      id="delivery"
                      value={selectedDelivery}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDelivery(e.target.value)}
                      className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 px-3.5 text-sm leading-5 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yogurt-red dark:focus:ring-accent-green focus:border-transparent transition-colors"
                    >
                      {deliveryOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.name} (+KES {option.price.toFixed(2)})</option>
                      ))}
                    </select>
                    <ChevronLeft size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 transform rotate-[-90deg] pointer-events-none" /> 
                  </div>
                </div>
                
                {/* Promo Code Section */}
                <div className="mb-6">
                  <label htmlFor="promo" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="promo" 
                      value={promoCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(null); }}
                      placeholder="Enter code (e.g. WELCOME10)"
                      className="flex-grow bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 px-3.5 text-sm leading-5 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yogurt-red dark:focus:ring-accent-green focus:border-transparent transition-colors"
                    />
                    {discount > 0 ? (
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={removePromo}
                        className="px-4 py-2 text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/70 transition-colors"
                      >
                        Remove
                      </motion.button>
                    ) : (
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={applyPromoCode}
                        className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        Apply
                      </motion.button>
                    )}
                  </div>
                  {promoError && <p className="text-xs text-red-500 mt-1.5">{promoError}</p>}
                </div>
                
                {/* Total */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mb-6">
                  <div className="flex justify-between items-baseline text-gray-800 dark:text-white">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold font-display">KES {total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Including taxes and fees</p>
                </div>
                
                {/* Checkout Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2.5 bg-yogurt-red text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:bg-red-700 dark:bg-accent-green dark:hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-green-800"
                >
                  <Shield size={20} /> Proceed to Secure Checkout
                </motion.button>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1.5">
                    <LockIcon width={12} height={12} /> Secure payments by Stripe
                  </p>
                </div>
              </div>
              
              {/* Recommendations */}
              {recommendedProducts.length > 0 && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center">
                    <Sparkles size={20} className="mr-2 text-yellow-500 dark:text-yellow-400" /> You might also like
                  </h3>
                  <div className="space-y-4">
                    {recommendedProducts.slice(0,2).map(product => (
                      <RecommendationCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Only render ParticleBurst3D on desktop */}
      {!isMobile && (
        <Suspense fallback={null}>
          <ParticleBurst3D position={[0, 0, 0]} />
        </Suspense>
      )}
    </div>
  );
}