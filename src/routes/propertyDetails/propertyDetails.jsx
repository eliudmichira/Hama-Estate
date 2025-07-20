import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './propertyDetails.scss';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MapPin, 
  Bed, 
  Bath, 
  Building2, 
  Car, 
  Star, 
  Calendar,
  DollarSign,
  Users,
  Home,
  School,
  TrendingUp,
  Clock,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Star as StarIcon,
  X
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

// Enhanced mock data for property details
const mockPropertyDetails = {
  id: 1,
  title: "Beautiful Family Home in Prime Location",
  price: 450000,
  pricePerSqft: 375,
  bedrooms: 3,
  bathrooms: 2,
  area: 1200,
  address: "123 Main St, Downtown, NY 10001",
  latitude: 40.7128,
  longitude: -74.0060,
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
  ],
  listing_type: "For Sale",
  days_on_market: 15,
  agent: {
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@realestate.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4.8,
    reviews: 127,
    experience: "8 years"
  },
  description: "This stunning family home offers the perfect blend of comfort and style. Located in a highly sought-after neighborhood, this property features modern amenities, spacious rooms, and beautiful finishes throughout. The open-concept living area is perfect for entertaining, while the private backyard provides a peaceful retreat. Don't miss this opportunity to own a piece of paradise in one of the city's most desirable locations.",
  features: [
    "Hardwood floors throughout",
    "Updated kitchen with granite countertops",
    "Master suite with walk-in closet",
    "Finished basement",
    "Two-car garage",
    "Central air conditioning",
    "Security system",
    "Energy-efficient windows"
  ],
  property_history: [
    { date: "2024-01-15", event: "Listed for sale", price: 450000 },
    { date: "2023-06-20", event: "Sold", price: 420000 },
    { date: "2020-03-10", event: "Sold", price: 380000 },
    { date: "2018-11-05", event: "Sold", price: 350000 }
  ],
  schools: [
    {
      name: "Downtown Elementary School",
      distance: "0.3 miles",
      rating: 9.2,
      type: "Public",
      grades: "K-5"
    },
    {
      name: "Central Middle School",
      distance: "0.8 miles",
      rating: 8.7,
      type: "Public",
      grades: "6-8"
    },
    {
      name: "Downtown High School",
      distance: "1.2 miles",
      rating: 8.9,
      type: "Public",
      grades: "9-12"
    }
  ],
  neighborhood: {
    name: "Downtown",
    walkScore: 92,
    transitScore: 88,
    bikeScore: 85,
    crimeRate: "Low",
    population: "12,450",
    medianAge: 34,
    medianIncome: "$85,000"
  },
  similar_properties: [
    {
      id: 2,
      title: "Modern Condo",
      price: 480000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      address: "456 Park Ave",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Charming Townhouse",
      price: 520000,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 1400,
      address: "789 Oak St",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
    }
  ]
};

// Photo Gallery Component
function PhotoGallery({ images, title }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl">
        <img
          src={images[currentImage]}
          alt={`${title} - Image ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {currentImage + 1} of {images.length}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentImage === index ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            <img
              src={images[currentImage]}
              alt={`${title} - Fullscreen`}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-200"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-200"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Agent Contact Card Component
function AgentContactCard({ agent }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-300 agent-card">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={agent.avatar}
          alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/50 dark:border-gray-600"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{agent.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{agent.rating}</span>
            <span>({agent.reviews} reviews)</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{agent.experience} experience</p>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-2 rounded-full transition-all duration-200 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200">
          <Phone className="w-4 h-4" />
          Call Agent
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
          <Mail className="w-4 h-4" />
          Email Agent
        </button>
      </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Contact Information:</p>
        <p className="text-sm text-gray-900 dark:text-gray-100">{agent.phone}</p>
        <p className="text-sm text-gray-900 dark:text-gray-100">{agent.email}</p>
      </div>
    </div>
  );
}

// School Ratings Component
function SchoolRatings({ schools }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <School className="w-5 h-5 text-blue-600" />
        Nearby Schools
      </h3>
      <div className="space-y-4">
        {schools.map((school, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{school.name}</h4>
              <p className="text-sm text-gray-600">{school.type} • {school.grades} • {school.distance}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold">{school.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Neighborhood Info Component
function NeighborhoodInfo({ neighborhood }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-600" />
        Neighborhood
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{neighborhood.walkScore}</div>
          <div className="text-sm text-gray-600">Walk Score</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600">{neighborhood.transitScore}</div>
          <div className="text-sm text-gray-600">Transit Score</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">{neighborhood.bikeScore}</div>
          <div className="text-sm text-gray-600">Bike Score</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl">
          <div className="text-2xl font-bold text-orange-600">{neighborhood.crimeRate}</div>
          <div className="text-sm text-gray-600">Crime Rate</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Population:</span>
          <span className="ml-2 font-semibold">{neighborhood.population}</span>
        </div>
        <div>
          <span className="text-gray-600">Median Age:</span>
          <span className="ml-2 font-semibold">{neighborhood.medianAge}</span>
        </div>
        <div>
          <span className="text-gray-600">Median Income:</span>
          <span className="ml-2 font-semibold">{neighborhood.medianIncome}</span>
        </div>
      </div>
    </div>
  );
}

// Property History Component
function PropertyHistory({ history }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Property History
      </h3>
      <div className="space-y-3">
        {history.map((event, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">{event.event}</p>
              <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatPrice(event.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Similar Properties Component
function SimilarProperties({ properties }) {
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-300 similar-property">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Similar Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => navigate(`/property/${property.id}`)}
            className="cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-xl mb-3">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
              {property.title}
            </h4>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatPrice(property.price)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {property.bedrooms} bed • {property.bathrooms} bath • {property.area.toLocaleString()} sqft
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{property.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Property Details Component
function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { theme } = useTheme ? useTheme() : { theme: 'light' };
  const isDark = (theme === 'dark' || (theme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));

  useEffect(() => {
    // Simulate API call to fetch property details
    // In a real app, you would fetch from your backend
    setProperty(mockPropertyDetails);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="text-gray-500">Loading property details...</div>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`property-details min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-gray-900${isDark ? ' darker' : ''}`}> 

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-white/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Search</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isFavorite ? 'bg-red-500 text-white' : 'text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            <PhotoGallery images={property.images} title={property.title} />

            {/* Property Info */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-300 property-info">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{property.title}</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{property.address}</p>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{formatPrice(property.price)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{property.days_on_market} days on market</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{formatPrice(property.pricePerSqft)}/sqft</div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Bath className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Building2 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{property.area.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Sq Ft</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <Car className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">2</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Garage</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl border border-white/30 dark:border-dark-700 rounded-2xl shadow-lg transition-colors duration-300 tabs">
              <div className="border-b border-gray-200 dark:border-dark-700">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: Home },
                    { id: 'schools', label: 'Schools', icon: School },
                    { id: 'neighborhood', label: 'Neighborhood', icon: MapPin },
                    { id: 'history', label: 'History', icon: TrendingUp }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-dark-600'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Property Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Type:</span>
                          <span className="ml-2 font-semibold">{property.listing_type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Year Built:</span>
                          <span className="ml-2 font-semibold">2015</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Lot Size:</span>
                          <span className="ml-2 font-semibold">5,000 sqft</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Parking:</span>
                          <span className="ml-2 font-semibold">2 spaces</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'schools' && <SchoolRatings schools={property.schools} />}
                {activeTab === 'neighborhood' && <NeighborhoodInfo neighborhood={property.neighborhood} />}
                {activeTab === 'history' && <PropertyHistory history={property.property_history} />}
              </div>
            </div>

            {/* Similar Properties */}
            <SimilarProperties properties={property.similar_properties} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            <AgentContactCard agent={property.agent} />

            {/* Quick Stats */}
            <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl border border-white/30 dark:border-dark-700 rounded-2xl p-6 shadow-lg transition-colors duration-300 property-stats">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Property Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Price per sqft:</span>
                  <span className="font-semibold">{formatPrice(property.pricePerSqft)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Days on market:</span>
                  <span className="font-semibold">{property.days_on_market}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Property type:</span>
                  <span className="font-semibold">Single Family</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Year built:</span>
                  <span className="font-semibold">2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails; 