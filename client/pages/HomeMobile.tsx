import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search,
  MapPin,
  Home,
  Building,
  TreePine,
  Star,
  Phone,
  TrendingUp,
  Menu,
  Sun,
  Moon,
  User,
  Heart,
  Filter,
  ChevronRight,
  Plus
} from "lucide-react";
import { useTheme } from "../src/context/ThemeContext";

// Pure Mobile App Home Component for Hama Estate
const HomeMobile = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: "5,000+", label: "Properties", icon: <Home className="w-4 h-4" /> },
    { value: "30", label: "Counties", icon: <MapPin className="w-4 h-4" /> },
    { value: "8,000+", label: "Customers", icon: <User className="w-4 h-4" /> },
    { value: "200+", label: "Agents", icon: <Building className="w-4 h-4" /> }
  ];

  const propertyTypes = [
    { icon: <Building className="w-5 h-5" />, name: "Apartments", count: "2,500+", color: "from-[#51faaa] to-[#45e695]", path: "/properties?type=apartment" },
    { icon: <Home className="w-5 h-5" />, name: "Houses", count: "1,800+", color: "from-[#51faaa] to-[#3dd88a]", path: "/properties?type=house" },
    { icon: <Building className="w-5 h-5" />, name: "Villas", count: "500+", color: "from-[#51faaa] to-[#35ca7f]", path: "/properties?type=villa" },
    { icon: <TreePine className="w-5 h-5" />, name: "Land", count: "200+", color: "from-[#51faaa] to-[#2dbc74]", path: "/properties?type=land" }
  ];

  const featuredProperties = [
    {
      id: 1,
      name: "Equity Afya⭐ Featured",
      location: "Juja",
      price: "Ksh 22,000",
      period: "per month",
      rating: 4.8,
      beds: 2,
      baths: 1,
      features: ["WiFi", "Parking", "Garden"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      path: "/property/1"
    },
    {
      id: 2,
      name: "Modern Apartment Complex",
      location: "Westlands",
      price: "Ksh 45,000",
      period: "per month",
      rating: 4.9,
      beds: 3,
      baths: 2,
      features: ["Pool", "Gym", "Security"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      path: "/property/2"
    }
  ];

  const handleSearch = () => {
    if (searchData.location || searchData.propertyType || searchData.priceRange) {
      const params = new URLSearchParams();
      if (searchData.location) params.append('location', searchData.location);
      if (searchData.propertyType) params.append('type', searchData.propertyType);
      if (searchData.priceRange) params.append('price', searchData.priceRange);
      
      navigate(`/properties?${params.toString()}`);
    } else {
      // If no search criteria, just go to properties page
      navigate('/properties');
    }
  };

  const handlePropertyTypeClick = (path) => {
    navigate(path);
  };

  const handleViewAllProperties = () => {
    navigate('/properties');
  };

  const handleContactAgent = (propertyName) => {
    // In a real app, this would open a contact form or phone call
    alert(`Contacting agent for ${propertyName}. This would open contact options.`);
  };

  const handleViewProperty = (path) => {
    navigate(path);
  };

  const handleStartSearching = () => {
    navigate('/properties');
  };

  const handleScheduleCall = () => {
    // In a real app, this would open a scheduling form
    alert('Opening call scheduling form. This would allow users to book a consultation.');
  };

  const handleBottomNavClick = (path) => {
    navigate(path);
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Custom Mobile Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3 px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#51faaa] to-[#dbd5a4] rounded-xl flex items-center justify-center shadow-lg shadow-[#51faaa]/25 group-hover:shadow-xl group-hover:shadow-[#51faaa]/40 transition-all duration-300">
                <span className="text-[#111] text-sm font-bold">H</span>
              </div>
              <span className="text-lg font-bold tracking-tight transition-colors text-gray-900 group-hover:text-[#51faaa]">Hama Estate</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="relative transition-all duration-300 rounded-full p-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-700/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
            >
              {isDark ? (
                <Sun className="w-5 h-5 drop-shadow-sm" />
              ) : (
                <Moon className="w-5 h-5 drop-shadow-sm" />
              )}
            </button>
            <div className="relative">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#51faaa]/30">
                  <div className="absolute -inset-1 rounded-full" style={{
                    background: "conic-gradient(rgb(81, 250, 170), rgb(219, 213, 164), rgb(81, 250, 170))",
                    mask: "radial-gradient(circle, transparent 55%, black 72%)",
                    WebkitMask: "radial-gradient(circle, transparent 55%, black 72%)",
                    transform: "rotate(168.72deg)"
                  }}></div>
                  <div className="relative z-10 w-full h-full rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#51faaa] to-[#dbd5a4] flex items-center justify-center">
                      <span className="text-[#111] font-bold text-sm">E</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="px-4 pt-6 pb-4"
        >
          <div className="bg-gradient-to-br from-[#51faaa] via-[#45e695] to-[#3dd88a] rounded-2xl p-6 text-[#111] text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Home className="w-12 h-12 mx-auto mb-3 text-[#111]/80" />
              <h2 className="text-xl font-bold mb-2">
                Find Your Perfect Home in Kenya
              </h2>
              <p className="text-sm text-[#111]/70 mb-3">
                Discover premium properties across all 47 counties
              </p>
              <div className="text-xs text-[#111]/60">
                Trusted by 10,000+ property seekers
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-4 mb-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={searchData.location}
                    onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                    className="w-full pl-7 pr-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-[#51faaa] focus:border-transparent"
                  >
                    <option value="">Location</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                  </select>
                </div>
                
                <div className="relative">
                  <Home className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={searchData.propertyType}
                    onChange={(e) => setSearchData({...searchData, propertyType: e.target.value})}
                    className="w-full pl-7 pr-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-[#51faaa] focus:border-transparent"
                  >
                    <option value="">Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
                
                <div className="relative">
                  <TrendingUp className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={searchData.priceRange}
                    onChange={(e) => setSearchData({...searchData, priceRange: e.target.value})}
                    className="w-full pl-7 pr-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-[#51faaa] focus:border-transparent"
                  >
                    <option value="">Price</option>
                    <option value="0-50000">0-50K</option>
                    <option value="50000-100000">50K-100K</option>
                    <option value="100000+">100K+</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#51faaa] to-[#45e695] text-[#111] py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-[#45e695] hover:to-[#3dd88a] transition-all"
              >
                <Search className="w-4 h-4" />
                Search Properties
              </button>
            </form>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Platform Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 15 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-[#51faaa]/20 flex items-center justify-center text-[#51faaa]">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Property Types */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Property Types</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {propertyTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex-shrink-0"
              >
                <button
                  onClick={() => handlePropertyTypeClick(type.path)}
                  className="w-24 h-24 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className={`w-8 h-8 mb-2 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center text-white`}>
                    {type.icon}
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                    {type.name}
                  </h4>
                  <p className="text-[#51faaa] dark:text-[#51faaa] text-xs font-semibold">
                    {type.count}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Properties */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Properties</h3>
            <button 
              onClick={handleViewAllProperties}
              className="text-[#51faaa] dark:text-[#51faaa] text-sm font-medium flex items-center gap-1 hover:underline"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                          {property.name}
                        </h4>
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">
                            {property.rating}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{property.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-base font-bold text-[#51faaa] dark:text-[#51faaa]">
                          {property.price}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          {property.period}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Home className="w-3 h-3" />
                          {property.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {property.baths}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {property.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-[#51faaa]/20 text-[#51faaa] rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleContactAgent(property.name)}
                          className="flex-1 bg-[#51faaa] text-[#111] py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 hover:bg-[#45e695] transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          Contact
                        </button>
                        <button 
                          onClick={() => handleViewProperty(property.path)}
                          className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="px-4 mb-6"
        >
          <div className="bg-gradient-to-r from-[#51faaa] to-[#45e695] rounded-xl p-4 text-[#111]">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Ready to Find Your Dream Home?</h3>
              <p className="text-white/90 mb-3 text-sm">
                Start your journey today
              </p>
              
              <div className="flex gap-2">
                <button 
                  onClick={handleStartSearching}
                  className="flex-1 bg-white/20 text-[#111] border border-white/30 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  Start Searching
                </button>
                <button 
                  onClick={handleScheduleCall}
                  className="flex-1 bg-white/20 text-[#111] border border-white/30 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Custom Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-around py-2">
          <button 
            onClick={() => handleBottomNavClick('/')}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg bg-[#51faaa]/20 text-[#51faaa]"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => handleBottomNavClick('/properties')}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Building className="w-5 h-5" />
            <span className="text-xs font-medium">Properties</span>
          </button>
          <button 
            onClick={() => handleBottomNavClick('/properties')}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-medium">Search</span>
          </button>
          <button 
            onClick={() => handleBottomNavClick('/dashboard')}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomeMobile;
